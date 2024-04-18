'use server';

export const updatePokemons = async () => {
	const response = await fetch('http://localhost:8080/api/v1/avatars');
	// await new Promise(resolve => setTimeout(resolve, 1000));
	return response.json();
};
