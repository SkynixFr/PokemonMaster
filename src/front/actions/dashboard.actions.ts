'use server';

// Actions
import {
	getAbilities,
	getMoves,
	getNatures,
	getPokemons
} from './pokeapi.actions';

export const updatePokemons = async () => {
	const pokemons = await getPokemons();
	const response = await fetch('http://localhost:8080/api/v1/pokemons', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(pokemons)
	});

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

	return response.json();
};

export const updateNatures = async () => {
	const natures = await getNatures();
	const response = await fetch('http://localhost:8080/api/v1/natures', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(natures)
	});

	return response.json();
};

export const updateAbilities = async () => {
	const abilities = await getAbilities();
	const response = await fetch('http://localhost:8080/api/v1/abilities', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(abilities)
	});

	return response.json();
};
