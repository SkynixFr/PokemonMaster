'use client';

import { useEffect, useState } from 'react';

import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
import { TeamEntity } from '../../../interfaces/team/teamEntity';

// Components

import Teams from '../teambuilder/teams';
import TeamsUser from './teamsUser';

interface profileUserTeamProps {
	teams: TeamEntity[];
	avatars: AvatarEntity[];
}

const profileUserTeam = ({ teams, avatars }: profileUserTeamProps) => {
	const [selectedTeam, setSelectedTeam] = useState<TeamEntity>(null);
	const [currentLength, setCurrentLength] = useState<number>(0);

	useEffect(() => {
		if (!teams) return;
		setSelectedTeam(teams[0]);
		setCurrentLength(teams.length);
	}, []);

	return (
		<TeamsUser
			avatars={avatars}
			teams={teams}
			setSelectedTeam={setSelectedTeam}
			selectedTeam={selectedTeam}
			setCurrentLength={setCurrentLength}
		/>
	);
};

export default profileUserTeam;
