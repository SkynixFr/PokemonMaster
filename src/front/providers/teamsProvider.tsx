import TeamBuilder from '../../app/teambuilder/page';
import { ReactNode } from 'react';
import {
	createTeam,
	deleteTeam,
	getAvatars,
	getTeams
} from '../actions/teams.actions';

const TeamsProvider = async ({ children }: { children: ReactNode }) => {
	const avatarsData = getAvatars();
	const teamsData = getTeams();
	const [avatars, teams] = await Promise.all([avatarsData, teamsData]);

	return (
		<>
			{avatars && teams ? (
				<TeamBuilder
					avatars={avatars}
					teams={teams}
					createTeam={createTeam}
					deleteTeam={deleteTeam}
				/>
			) : (
				<p>No data, something went wrong</p>
			)}
		</>
	);
};
export default TeamsProvider;
