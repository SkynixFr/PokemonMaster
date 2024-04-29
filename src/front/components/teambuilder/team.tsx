import Image from 'next/image';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
interface TeamListItemProps {
	team: TeamEntity;
	selectedTeam: (team: TeamEntity) => void;
	option?: boolean;
}

const Team = ({ team, selectedTeam, option }: TeamListItemProps) => {
	return (
		<div>
			<div onClick={() => selectedTeam(team)}>
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
				{team.name}
			</div>

			{option ? (
				<div>
					<button>Update</button>
					<button>Delete</button>
					<button>Copy</button>
				</div>
			) : null}
		</div>
	);
};

export default Team;
