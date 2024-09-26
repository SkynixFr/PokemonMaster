'use client';

import { useEffect, useState } from 'react';

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
	const [selectedTeam, setSelectedTeam] = useState<TeamEntity>(null);
	const [currentLength, setCurrentLength] = useState<number>(0);

	useEffect(() => {
		if (!teams) return;
		if (localStorage.getItem('teamActive')) {
			teams.map(team => {
				if (team.id === localStorage.getItem('teamActive')) {
					setSelectedTeam(team);
				}
			});
		} else {
			setSelectedTeam(teams[0]);
		}

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

			<div className={'teambuilder-team-details'}>
				{selectedTeam && <TeamDetails team={selectedTeam} />}
			</div>
		</div>
	);
};

export default TeamBuilderPage;
