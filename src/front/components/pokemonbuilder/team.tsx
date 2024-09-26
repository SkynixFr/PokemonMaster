'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Interfaces
interface TeamProps {
	teamActive: TeamEntity;
	saveTeam: (team: TeamEntity) => void;
	setTeamActive: (team: TeamEntity) => void;
}
import { TeamEntity } from '../../../interfaces/team/teamEntity';

// Icons
import { Edit3, MoveLeft, SaveAll, X } from 'lucide-react';
import { firstLetterMaj } from '../../utils/formatString';

const Team = ({ teamActive, saveTeam, setTeamActive }: TeamProps) => {
	const [openModal, setOpenModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
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

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsEditing(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setIsEditing]);

	return (
		<>
			{openModal && (
				<div className={'modal-save-team-container'}>
					<div className={'modal-save-team-content'}>
						<h1>
							Do you want to save your team{' '}
							<span>{firstLetterMaj(teamActive.name)}</span> ?
						</h1>
						<span>
							You will be able to find it in the teambuilder page
						</span>
						<div className={'modal-save-team-btn-container'}>
							<button
								className={'btn-secondary'}
								onClick={() => saveTeam(teamActive)}
							>
								Yes
							</button>
							<button
								className={'btn-primary'}
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
				<div className={'team-name-edit'}>
					{isEditing ? (
						<input
							type={'text'}
							value={teamActive.name}
							onChange={e =>
								setTeamActive({ ...teamActive, name: e.target.value })
							}
							onBlur={() => setIsEditing(false)}
							autoFocus
						/>
					) : (
						<h2>{teamActive.name}</h2>
					)}
					<button onClick={() => setIsEditing(!isEditing)}>
						{isEditing ? (
							<SaveAll width={20} height={20} />
						) : (
							<Edit3 width={20} height={20} />
						)}
					</button>
				</div>
				<div></div>
			</div>
		</>
	);
};

export default Team;
