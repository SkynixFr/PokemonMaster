import StatChange from '../classes/statChange';
import StatBuilder from './utils/statBuilder';

describe('StatChange', () => {
	let statChange: StatChange;

	beforeEach(() => {
		statChange = new StatChange(new StatBuilder().default(), 1);
	});

	test('should have a stat', () => {
		expect(statChange.stat).toBeDefined();
	});

	test('should have a change', () => {
		expect(statChange.change).toBeDefined();
	});
});
