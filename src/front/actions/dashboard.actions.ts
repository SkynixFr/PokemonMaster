'use server';

import { getMoves, getPokemons } from './pokeapi.actions';

export const updatePokemons = async () => {
	const pokemons = await getPokemons();
	const response = await fetch('http://localhost:8080/api/v1/pokemons', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(pokemons)
	});

	if (response.status !== 201) {
		throw new Error('Failed to update pokemons');
	}

	return response.json();
};

export const updateMoves = async () => {
	const moves = await getMoves();
	const response = await fetch('http://localhost:8080/api/v1/moves', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(moves)
	});

	if (response.status !== 201) {
		throw new Error('Failed to update moves');
	}

	return response.json();
};
