'use client';

import { useState } from 'react';
import Link from 'next/link';

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
			<Link href={'/'}>Go back</Link>
			<div>
				<FormTeam avatars={avatars} />
				<Teams teams={teams} setSelectedTeam={setSelectedTeam} />
			</div>

			{selectedTeam && <TeamDetails team={selectedTeam} />}
		</div>
	);
};

export default TeamBuilderPage;
