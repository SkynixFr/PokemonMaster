import Ability from '../classes/ability';
import AbilityBuilder from './utils/abilityBuilder';

describe('Ability', () => {
	let ability: Ability;

	beforeEach(() => {
		ability = new AbilityBuilder().default();
	});

	test('should have an id', () => {
		expect(ability.id).toBeDefined();
	});

	test('should have a name', () => {
		expect(ability.name).toBeDefined();
	});

	test('should have a description', () => {
		expect(ability.description).toBeDefined();
	});

	test('should have learnedBy', () => {
		expect(ability.learnedBy).toBeDefined();
	});
});
