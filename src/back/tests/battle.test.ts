// Builder
import BattleBuilder from './utils/battleBuilder';

// Classes
import Battle from '../classes/battle';

describe('Battle', () => {
	let battle: Battle;

	beforeEach(() => {
		battle = new BattleBuilder().default();
	});

	test('should have a player team', () => {
		expect(battle.playerTeam).toBeDefined();
	});

	test('should have an opponent team', () => {
		expect(battle.opponentTeam).toBeDefined();
	});

	test('should have an active player pokemon', () => {
		expect(battle.activePlayerPokemon).toBeDefined();
	});

	test('should have an active opponent pokemon', () => {
		expect(battle.activeOpponentPokemon).toBeDefined();
	});

	test('should have a turn', () => {
		expect(battle.turn).toBeDefined();
	});
});
