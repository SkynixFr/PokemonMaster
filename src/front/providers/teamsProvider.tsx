import IAvatar from '../../interfaces/IAvatar';
import axios from 'axios';
import ITeam from '../../interfaces/ITeam';
import TeamBuilder from '../../app/teambuilder/page';
import { ReactNode } from 'react';
import { revalidatePath } from 'next/cache';

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

async function createTeam(team: ITeam): Promise<string> {
	'use server';
	try {
		const response = await axios.post(
			'http://localhost:8080/api/v1/teams',
			team
		);
		revalidatePath('/teambuilder');
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
				/>
			) : (
				<p>No data, something went wrong</p>
			)}
		</>
	);
};
export default TeamsProvider;
