// Components
import Team from './team';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { useEffect, useState } from 'react';
import FormTeam from './formTeam';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

interface TeamsProps {
	teams: TeamEntity[];
	setSelectedTeam: (team: TeamEntity) => void;
	selectedTeam: TeamEntity;
	avatars: AvatarEntity[];
	setCurrentLength: (length: number) => void;
}

const Teams = ({
	teams,
	selectedTeam,
	setSelectedTeam,
	avatars,
	setCurrentLength
}: TeamsProps) => {
	const [currentTeams, setCurrentTeams] = useState<TeamEntity[]>([]);

	const handleSelectedTeam = (team: TeamEntity) => {
		setSelectedTeam(team);
	};

	const resetSelectedTeam = () => {
		setSelectedTeam(teams.filter(team => team.id !== selectedTeam.id)[0]);
	};

	useEffect(() => {
		if (teams && teams.length > 0) {
			setSelectedTeam(teams[0]);
			setCurrentTeams(teams);
		}
	}, []);

	return (
		<>
			<FormTeam
				avatars={avatars}
				setSelectedTeam={setSelectedTeam}
				setCurrentTeams={setCurrentTeams}
				currentTeams={teams}
				setCurrentLength={setCurrentLength}
			/>

			<div className={'teams-container'}>
				{currentTeams && currentTeams.length > 0 ? (
					<>
						<h3>Your teams</h3>
						<div className={'teams-list'}>
							{currentTeams.map(team => (
								<Team
									team={team}
									key={team.id}
									selectedTeam={selectedTeam}
									setSelectedTeam={() => handleSelectedTeam(team)}
									resetSelectedTeam={resetSelectedTeam}
									setCurrentTeams={setCurrentTeams}
									currentTeams={currentTeams}
									setCurrentLength={setCurrentLength}
									option={true}
								/>
							))}
						</div>
					</>
				) : (
					<div>No teams found</div>
				)}
			</div>
		</>
	);
};

export default Teams;
