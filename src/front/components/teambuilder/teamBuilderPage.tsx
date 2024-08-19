'use client';

import { useState } from 'react';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

// Components
import TeamDetails from './teamDetails';
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
				<Teams
					avatars={avatars}
					teams={teams}
					setSelectedTeam={setSelectedTeam}
					selectedTeam={selectedTeam}
				/>
			</div>

			<div className={'teambuilder-team-details'}>
				{selectedTeam && <TeamDetails team={selectedTeam} />}
			</div>
		</div>
	);
};

export default TeamBuilderPage;
