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

	test('should increase the value', () => {
		const increasedStat = stat.increase(5);
		expect(increasedStat.value).toBe(stat.value + 5);
	});

	test('should decrease the value', () => {
		const decreasedStat = stat.decrease(5);
		expect(decreasedStat.value).toBe(stat.value - 5);
	});
});
