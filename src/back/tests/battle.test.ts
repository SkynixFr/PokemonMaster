// Builder
import BattleBuilder from './utils/battleBuilder';

// Classes
import Battle from '../classes/battle';

describe('Battle', () => {
	let battle: Battle;

	beforeEach(() => {
		battle = new BattleBuilder().default();
	});

	test('should have an opponent pokemon', () => {
		expect(battle.opponentPokemon).toBeDefined();
	});

	test('should have a player pokemon', () => {
		expect(battle.playerPokemon).toBeDefined();
	});
});
