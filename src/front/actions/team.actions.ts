'use server';

export const getTeams = async () => {
	const response = await fetch('http://localhost:8080/api/v1/teams', {
		method: 'GET',
		cache: 'no-store'
	});
	return response.json();
};
