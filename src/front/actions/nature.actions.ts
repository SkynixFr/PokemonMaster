'use server';

export const getNatures = async () => {
	const response = await fetch('http://localhost:8080/api/v1/natures', {
		method: 'GET'
	});

	return response.json();
};
