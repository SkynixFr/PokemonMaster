import Meta from '../classes/meta';
import MetaBuilder from './utils/metaBuilder';

describe('Meta', () => {
	let meta: Meta;

	beforeEach(() => {
		meta = new MetaBuilder().default();
	});

	test('should have an ailment', () => {
		expect(meta.ailment).toBeDefined();
	});

	test('should have a drain', () => {
		expect(meta.drain).toBeDefined();
	});

	test('should have a healing', () => {
		expect(meta.healing).toBeDefined();
	});

	test('should have a critRate', () => {
		expect(meta.critRate).toBeDefined();
	});

	test('should have a priority', () => {
		expect(meta.priority).toBeDefined();
	});

	test('should have an effectChance', () => {
		expect(meta.effectChance).toBeDefined();
	});

	test('should have a flinchChance', () => {
		expect(meta.flinchChance).toBeDefined();
	});

	test('should have a statChance', () => {
		expect(meta.statChance).toBeDefined();
	});

	test('should have a minHits', () => {
		expect(meta.minHits).toBeDefined();
	});

	test('should have a maxHits', () => {
		expect(meta.maxHits).toBeDefined();
	});

	test('should have a minTurns', () => {
		expect(meta.minTurns).toBeDefined();
	});

	test('should have a maxTurns', () => {
		expect(meta.maxTurns).toBeDefined();
	});
});
