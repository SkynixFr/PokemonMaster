// Builder
import StatBuilder from './utils/statBuilder';

// Classes
import Stat from '../classes/stat';

describe('Stat', () => {
	let stat: Stat;

	beforeEach(() => {
		stat = new StatBuilder().default();
	});

	test('should have a name', () => {
		expect(stat.name).toBeDefined();
	});

	test('should have a value', () => {
		expect(stat.value).toBeDefined();
	});

	test('should not decrease the value below 0', () => {
		const decreasedStat = stat.decrease(stat.max + 1);
		expect(decreasedStat.value).toBe(0);
	});

	test('should decrease the value', () => {
		const decreasedStat = stat.decrease(5);
		expect(decreasedStat.value).toBe(stat.value - 5);
	});

	test('should not increase the value above the max', () => {
		const increasedStat = stat.increase(stat.value + 1);
		expect(increasedStat.value).toBe(stat.max);
	});

	test('should increase the value', () => {
		const newStat = stat.decrease(10);
		const increasedStat = newStat.increase(5);
		expect(increasedStat.value).toBe(newStat.value + 5);
	});
});
