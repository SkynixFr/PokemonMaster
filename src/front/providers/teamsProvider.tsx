import IAvatar from '../../interfaces/IAvatar';
import axios from 'axios';
import ITeam, { ITeamEntity } from '../../interfaces/ITeam';
import TeamBuilder from '../../app/teambuilder/page';
import { ReactNode } from 'react';
import { revalidatePath } from 'next/cache';
import ITeamResponse from '../../interfaces/ITeam';

async function getAvatars(): Promise<IAvatar[]> {
	try {
		const response = await axios.get('http://localhost:8080/api/v1/avatars');
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

async function getTeams(): Promise<ITeam[]> {
	try {
		const response = await axios.get('http://localhost:8080/api/v1/teams');
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

async function createTeam(team: ITeamEntity): Promise<ITeamResponse> {
	'use server';
	const response = await axios.post(
		'http://localhost:8080/api/v1/teams',
		team
	);
	revalidatePath('/teambuilder');
	return response.data;
}

async function deleteTeam(teamId: string): Promise<void> {
	'use server';
	try {
		await axios.delete('http://localhost:8080/api/v1/teams/' + teamId);
		revalidatePath('/teambuilder');
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response.data;
		}
	}
}

export async function getTeam(teamId: string): Promise<ITeamResponse> {
	'use server';
	try {
		const response = await axios.get(
			'http://localhost:8080/api/v1/teams/' + teamId
		);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response.data;
		}
	}
}

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
