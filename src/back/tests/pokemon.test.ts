// Builder
import PokemonBuilder from './utils/pokemonBuilder';

// Classes
import Pokemon from '../classes/pokemon';
import StatBuilder from './utils/statBuilder';

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
		const updatedOpponentPokemon = playerPokemon.attack(
			opponentPokemon,
			playerPokemon.moves[0]
		);
		const updatedOpponentHp = updatedOpponentPokemon.stats.find(
			stat => stat.name === 'hp'
		);
		expect(updatedOpponentHp.value).toBe(
			initialHp - playerPokemon.moves[0].power
		);
	});

	test('should heal', () => {
		const hp = playerPokemon.stats.find(stat => stat.name === 'hp');
		const initialHp = hp.value;
		const updatedPlayerPokemon = playerPokemon.heal();
		const updatedHp = updatedPlayerPokemon.stats.find(
			stat => stat.name === 'hp'
		);
		expect(updatedHp.value).toBe(initialHp + 20);
	});
});
