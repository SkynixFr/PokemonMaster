'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Interfaces
interface TeamProps {
	teamActive: TeamEntity;
	saveTeam: (team: TeamEntity) => void;
}
import { TeamEntity } from '../../../interfaces/team/teamEntity';

// Icons
import { MoveLeft, X } from 'lucide-react';

const Team = ({ teamActive, saveTeam }: TeamProps) => {
	const [openModal, setOpenModal] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenModal(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpenModal]);

	return (
		<>
			{openModal && (
				<div className={'team-modal'}>
					<div className={'team-modal-content'}>
						<h2>Do you want to save the team?</h2>
						<div className={'team-modal-buttons'}>
							<button
								className={'team-modal-button btn-primary'}
								onClick={() => {
									saveTeam(teamActive);
									router.push('/teambuilder');
								}}
							>
								Yes
							</button>
							<button
								className={'team-modal-button'}
								onClick={() => router.push('/teambuilder')}
							>
								No
							</button>
						</div>
						<button
							className={'close-btn'}
							onClick={() => setOpenModal(false)}
						>
							<X width={30} height={30} />
						</button>
					</div>
				</div>
			)}
			<div className={'team-infos'}>
				<div
					className={'team-goback'}
					onClick={() => setOpenModal(!openModal)}
				>
					<MoveLeft />
					Back
				</div>
				<h1>{teamActive.name.toUpperCase()}</h1>
				<div></div>
			</div>
		</>
	);
};

export default Team;
