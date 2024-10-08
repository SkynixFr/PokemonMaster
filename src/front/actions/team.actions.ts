'use server';

// Interfaces
import { TeamCreate } from '../../interfaces/team/teamCreate';
import { TeamUpdate } from '../../interfaces/team/teamUpdate';
import { TeamEntity } from '../../interfaces/team/teamEntity';

export const getTeams = async () => {
	const response = await fetch('http://localhost:8080/api/v1/teams', {
		method: 'GET',
		cache: 'no-store'
	});
	return response.json();
};

export const getTeam = async (teamId: string) => {
	const response = await fetch(
		`http://localhost:8080/api/v1/teams/${teamId}`,
		{
			method: 'GET',
			cache: 'no-store'
		}
	);
	return response.json();
};

export const createTeam = async (formData: FormData, avatarId: string) => {
	const team: TeamCreate = {
		name: formData.get('team').toString(),
		avatarId
	};

	const response = await fetch('http://localhost:8080/api/v1/teams', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(team)
	});
	return response.json();
};

export const copyTeam = async (team: TeamEntity) => {
	const response = await fetch('http://localhost:8080/api/v1/teams/copy', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(team)
	});
	return response.json();
};

export const deleteTeam = async (teamId: string) => {
	await fetch(`http://localhost:8080/api/v1/teams/${teamId}`, {
		method: 'DELETE'
	});
};

export const addPokemonToTeam = async (teamId: string, team: TeamUpdate) => {
	const response = await fetch(
		`http://localhost:8080/api/v1/teams/${teamId}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(team)
		}
	);
	return response.json();
};
