'use server';

export const getPokemons = async () => {
	const response = await fetch('http://localhost:8080/api/v1/pokemons', {
		method: 'GET'
	});

	return response.json();
};
