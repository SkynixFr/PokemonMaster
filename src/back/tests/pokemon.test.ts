// Builder
import PokemonBuilder from './utils/pokemonBuilder';

// Classes
import Pokemon from '../classes/pokemon';
import MoveBuilder from './utils/moveBuilder';
import StatusBuilder from './utils/statusBuilder';
import MetaBuilder from './utils/metaBuilder';

describe('Pokemon', () => {
	let pokemon: Pokemon;

	beforeEach(() => {
		pokemon = new PokemonBuilder().default();
	});

	test('should have a pokedexId', () => {
		expect(pokemon.pokedexId).toBeDefined();
	});

	test('should have a name', () => {
		expect(pokemon.name).toBeDefined();
	});

	test('should have types', () => {
		expect(pokemon.types).toBeDefined();
	});

	test('should have a level', () => {
		expect(pokemon.level).toBeDefined();
	});

	test('should have an ability', () => {
		expect(pokemon.ability).toBeDefined();
	});

	test('should have a nature', () => {
		expect(pokemon.nature).toBeDefined();
	});

	test('should have a gender', () => {
		expect(pokemon.gender).toBeDefined();
	});

	test('should have a shiny status', () => {
		expect(pokemon.isShiny).toBeDefined();
	});

	test('should have moves', () => {
		expect(pokemon.moves).toBeDefined();
	});

	test('should have an item', () => {
		expect(pokemon.item).toBeDefined();
	});

	test('should have stats', () => {
		expect(pokemon.stats).toBeDefined();
	});

	test('should have a weight', () => {
		expect(pokemon.weight).toBeDefined();
	});

	test('should have an active move', () => {
		expect(pokemon.activeMove).toBeDefined();
	});

	test('should have a status', () => {
		expect(pokemon.status).toBeDefined();
	});

	test('should have a volatile status', () => {
		expect(pokemon.volatileStatus).toBeDefined();
	});

	test('should have an index', () => {
		expect(pokemon.index).toBeDefined();
	});

	test('should return stat by name', () => {
		const stat = pokemon.getStatByName('hp');
		expect(stat.name).toBe('hp');
	});

	test('should change active move', () => {
		const move = new MoveBuilder().withName('newMove').build();
		const newPokemon = pokemon.changeActiveMove(move);
		expect(newPokemon.activeMove.name).toBe('newMove');
	});

	test('should update moves', () => {
		const activeMove = new MoveBuilder()
			.withName('Ember')
			.withDescription('updatedMove')
			.build();
		const newPokemon = pokemon.changeActiveMove(activeMove);
		const updatedPokemon = newPokemon.updateMoves();
		expect(updatedPokemon.moves[0].description).toBe('updatedMove');
	});

	test('should attack and decrease HP from target', () => {
		const target = new PokemonBuilder().default();
		const updatedPokemon = pokemon.attack(target);
		expect(updatedPokemon.getStatByName('hp').value).toBe(60);
	});

	test('should change status', () => {
		const status = new StatusBuilder().withName('PSN').build();
		const newPokemon = pokemon.changeStatus(status);
		expect(newPokemon.status.name).toBe('PSN');
	});

	test('should not change status if already one', () => {
		const status = new StatusBuilder().withName('PSN').build();
		const newStatus = new StatusBuilder().withName('SLP').build();
		const newPokemon = pokemon.changeStatus(status);
		const updatedPokemon = newPokemon.changeStatus(newStatus);
		expect(updatedPokemon.status.name).toBe('PSN');
	});

	test('should change volatile status', () => {
		const status = new StatusBuilder().withName('CNF').build();
		const newPokemon = pokemon.changeVolatileStatus(status);
		expect(newPokemon.volatileStatus.name).toBe('CNF');
	});

	test('should suffer from status', () => {
		const status = new StatusBuilder().withName('PSN').build();
		const newPokemon = pokemon.changeStatus(status);
		const updatedPokemon = newPokemon.sufferFromStatus();
		expect(updatedPokemon.getStatByName('hp').value).toBe(87);
	});
});
