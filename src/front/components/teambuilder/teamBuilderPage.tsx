'use client';

import { useState } from 'react';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

// Components
import TeamDetails from './teamDetails';
import FormTeam from './formTeam';
import Teams from './teams';

interface TeamListProps {
	teams: TeamEntity[];
	avatars: AvatarEntity[];
}

const TeamBuilderPage = ({ teams, avatars }: TeamListProps) => {
	const [selectedTeam, setSelectedTeam] = useState<TeamEntity>(teams[0]);

	return (
		<div>
			<div>
				<FormTeam avatars={avatars} />
				<Teams teams={teams} setSelectedTeam={setSelectedTeam} />
			</div>

			{selectedTeam && <TeamDetails team={selectedTeam} />}
		</div>
	);
};

export default TeamBuilderPage;
