'use client';
import { useRouter } from 'next/navigation';

// Interfaces
interface TeamProps {
	teamName: string;
}

// Icons
import { MoveLeft } from 'lucide-react';

const Team = ({ teamName }: TeamProps) => {
	const router = useRouter();
	return (
		<div className={'team-infos'}>
			<div
				className={'team-goback'}
				onClick={() => router.push('/teambuilder')}
			>
				<MoveLeft />
				Back
			</div>
			<h1>{teamName.toUpperCase()}</h1>
			<div></div>
		</div>
	);
};

export default Team;
