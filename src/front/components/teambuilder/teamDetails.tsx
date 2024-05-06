import Image from 'next/image';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
interface TeamDetailsProps {
	team: TeamEntity;
}

const TeamDetails = ({ team }: TeamDetailsProps) => {
	return (
		<div>
			<h1>Team Details</h1>
			{team && (
				<div>
					<Image
						src={team.avatar.sprite}
						alt={team.avatar.name}
						width={100}
						height={100}
						priority={true}
						quality={100}
						sizes={'100vw'}
						style={{ objectFit: 'contain' }}
					/>
					<h2>{team.name}</h2>
				</div>
			)}
		</div>
	);
};

export default TeamDetails;
