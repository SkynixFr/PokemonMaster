//react
import React, { useEffect, useState } from 'react';

//Model
import { TeamEntity } from '../../../interfaces/team/teamEntity';

//Components
import Teams from '../teambuilder/teams';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
interface ProfileTeamsProps {
	teams: TeamEntity[];
	avatars: AvatarEntity[];
}

const ProfileTeams = ({ teams, avatars }: ProfileTeamsProps) => {
	const [selectedTeam, setSelectedTeam] = useState<TeamEntity>(null);
	const [currentLength, setCurrentLength] = useState<number>(0);

	useEffect(() => {
		if (!teams) return;
		setSelectedTeam(teams[0]);
		setCurrentLength(teams.length);
	}, []);

	return (
		<div className={'teambuilder-container'}>
			<div className={'teambuilder-teams'}>
				<Teams
					avatars={avatars}
					teams={teams}
					setSelectedTeam={setSelectedTeam}
					selectedTeam={selectedTeam}
					setCurrentLength={setCurrentLength}
				/>
				<div className={'teams-number'}>
					{currentLength === 15 ? (
						<h3>Max teams reached</h3>
					) : (
						<h3>{currentLength}/15</h3>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfileTeams;
