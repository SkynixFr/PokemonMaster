// Components
import Team from './team';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';

interface TeamsProps {
	teams: TeamEntity[];
	setSelectedTeam: (team: TeamEntity) => void;
}

const Teams = ({ teams, setSelectedTeam }: TeamsProps) => {
	const handleSelectedTeam = (team: TeamEntity) => {
		setSelectedTeam(team);
	};
	return (
		<div>
			{teams && teams.length > 0 ? (
				teams.map(team => (
					<Team
						team={team}
						key={team.id}
						selectedTeam={() => handleSelectedTeam(team)}
						option={true}
					/>
				))
			) : (
				<div>No teams found</div>
			)}
		</div>
	);
};

export default Teams;
