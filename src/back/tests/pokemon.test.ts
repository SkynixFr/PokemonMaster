// Builder
import PokemonBuilder from './utils/pokemonBuilder';

// Classes
import Pokemon from '../classes/pokemon';

describe('Pokemon', () => {
	let playerPokemon: Pokemon;
	let opponentPokemon: Pokemon;

	beforeEach(() => {
		playerPokemon = new PokemonBuilder().default();
		opponentPokemon = new PokemonBuilder().withName('Bulbasaur').build();
	});

	test('should be able to create a pokemon', () => {
		const playerPokemonTest = new PokemonBuilder().build();
		expect(playerPokemon).toStrictEqual(playerPokemonTest);
	});

	test('should have a name', () => {
		expect(playerPokemon.name).toBe('Charizard');
	});
});
