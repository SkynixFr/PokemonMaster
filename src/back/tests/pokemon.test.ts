// Builder
import PokemonBuilder from './utils/pokemonBuilder';
import StatBuilder from './utils/statBuilder';

// Classes
import Pokemon from '../classes/pokemon';

describe('Pokemon', () => {
	let playerPokemon: Pokemon;
	let opponentPokemon: Pokemon;

	beforeEach(() => {
		playerPokemon = new PokemonBuilder().default();
		opponentPokemon = new PokemonBuilder()
			.withName('Bulbasaur')
			.withStats([new StatBuilder().withName('hp').withValue(100).build()])
			.build();
	});

	test('should have a name', () => {
		expect(playerPokemon.name).toBeDefined();
	});

	test('should have stats', () => {
		expect(playerPokemon.stats).toBeDefined();
	});

	test('should have moves', () => {
		expect(playerPokemon.moves).toBeDefined();
	});

	test('should attack', () => {
		const opponentHp = opponentPokemon.stats.find(stat => stat.name === 'hp');
		const initialHp = opponentHp.value;
		const updatedOpponentPokemon = playerPokemon.attack(opponentPokemon);
		const updatedOpponentHp = updatedOpponentPokemon.stats.find(
			stat => stat.name === 'hp'
		);
		expect(updatedOpponentHp.value).toBe(
			initialHp - playerPokemon.moves[0].power
		);
	});
});
