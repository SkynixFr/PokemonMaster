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
		<div className={'teambuilder-container'}>
			<div className={'teambuilder-teams'}>
				<FormTeam avatars={avatars} />
				<Teams teams={teams} setSelectedTeam={setSelectedTeam} />
			</div>

			<div className={'teambuilder-team-details'}>
				{selectedTeam && <TeamDetails team={selectedTeam} />}
			</div>
		</div>
	);
};

export default TeamBuilderPage;
