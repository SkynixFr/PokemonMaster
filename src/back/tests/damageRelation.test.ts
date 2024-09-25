import DamageRelation from '../classes/damageRelation';
import DamageRelationBuilder from './utils/damageRelationBuilder';

describe('DamageRelation', () => {
	let damageRelation: DamageRelation;

	beforeEach(() => {
		damageRelation = new DamageRelationBuilder().default();
	});

	test('should have doubleDamageFrom', () => {
		expect(damageRelation.doubleDamageFrom).toBeDefined();
	});

	test('should have doubleDamageTo', () => {
		expect(damageRelation.doubleDamageTo).toBeDefined();
	});

	test('should have halfDamageFrom', () => {
		expect(damageRelation.halfDamageFrom).toBeDefined();
	});

	test('should have halfDamageTo', () => {
		expect(damageRelation.halfDamageTo).toBeDefined();
	});

	test('should have noDamageFrom', () => {
		expect(damageRelation.noDamageFrom).toBeDefined();
	});

	test('should have noDamageTo', () => {
		expect(damageRelation.noDamageTo).toBeDefined();
	});
});
