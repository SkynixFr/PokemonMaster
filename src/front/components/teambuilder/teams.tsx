// Components
import Team from './team';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';

interface TeamsProps {
	teams: TeamEntity[];
	setSelectedTeam: (team: TeamEntity) => void;
	selectedTeam: TeamEntity;
}

const Teams = ({ teams, selectedTeam, setSelectedTeam }: TeamsProps) => {
	const handleSelectedTeam = (team: TeamEntity) => {
		setSelectedTeam(team);
	};
	return (
		<div className={'teams-container'}>
			{teams && teams.length > 0 ? (
				<>
					<h3>Your teams</h3>
					<div className={'teams-list'}>
						{teams.map(team => (
							<Team
								team={team}
								key={team.id}
								selectedTeam={selectedTeam}
								setSelectedTeam={() => handleSelectedTeam(team)}
								option={true}
							/>
						))}
					</div>
				</>
			) : (
				<div>No teams found</div>
			)}
		</div>
	);
};

export default Teams;
