import Nature from '../classes/nature';

describe('Nature', () => {
	let nature: Nature;

	beforeEach(() => {
		nature = new Nature('adamant', 'Adamant', 'attack', 'special-attack');
	});

	test('should have an id', () => {
		expect(nature.id).toBe('adamant');
	});

	test('should have a name', () => {
		expect(nature.name).toBe('Adamant');
	});

	test('should have an increased stat', () => {
		expect(nature.increasedStat).toBe('attack');
	});

	test('should have a decreased stat', () => {
		expect(nature.decreasedStat).toBe('special-attack');
	});
});
