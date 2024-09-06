'use server';

export const getAbilities = async () => {
	const response = await fetch('http://localhost:8080/api/v1/abilities', {
		method: 'GET'
	});

	return response.json();
};
