'use server';
import IAvatar from '../../interfaces/IAvatar';
import axios from 'axios';
import ITeam, { ITeamCreate, ITeamUpdate } from '../../interfaces/ITeam';
import ITeamResponse from '../../interfaces/ITeam';
import { revalidatePath } from 'next/cache';

export async function getAvatars(): Promise<IAvatar[]> {
	try {
		const response = await axios.get('http://localhost:8080/api/v1/avatars');
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

export async function getTeams(): Promise<ITeam[]> {
	try {
		const response = await axios.get('http://localhost:8080/api/v1/teams');
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

export async function createTeam(team: ITeamCreate): Promise<ITeamResponse> {
	'use server';
	const response = await axios.post(
		'http://localhost:8080/api/v1/teams',
		team
	);
	revalidatePath('/teambuilder');
	return response.data;
}

export async function deleteTeam(teamId: string): Promise<void> {
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

export async function saveTeam(
	teamId: string,
	teamUpdate: ITeamUpdate
): Promise<ITeamResponse> {
	'use server';
	console.log(teamUpdate);
	try {
		const response = await axios.put(
			`http://localhost:8080/api/v1/teams/${teamId}`,
			teamUpdate
		);
		revalidatePath(`/teambuilder`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}
