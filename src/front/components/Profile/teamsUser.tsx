// Components
import Team from '../teambuilder/team';
import TeamProfile from './teamProfile';
// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { useEffect, useState } from 'react';
import FormTeam from '../teambuilder/formTeam';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

interface TeamsProps {
	teams: TeamEntity[];
	setSelectedTeam: (team: TeamEntity) => void;
	selectedTeam: TeamEntity;
	avatars: AvatarEntity[];
	setCurrentLength: (length: number) => void;
}

const TeamsUser = ({
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
			<div className={'teams-container'}>
				{currentTeams && currentTeams.length > 0 ? (
					<>
						<div className={'teams-list'}>
							{currentTeams.map(team => (
								<TeamProfile
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

export default TeamsUser;
