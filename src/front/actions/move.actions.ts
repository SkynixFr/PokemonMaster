'use server';

export const getMoves = async () => {
	const response = await fetch('http://localhost:8080/api/v1/moves', {
		method: 'GET'
	});

	return response.json();
};
