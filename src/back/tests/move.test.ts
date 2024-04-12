// Builder
import MoveBuilder from './utils/moveBuilder';

// Classes
import Move from '../classes/move';

describe('Move', () => {
	let move: Move;

	beforeEach(() => {
		move = new MoveBuilder().default();
	});

	test('should have a name', () => {
		expect(move.name).toBeDefined();
	});

	test('should have a power', () => {
		expect(move.power).toBeDefined();
	});
});
