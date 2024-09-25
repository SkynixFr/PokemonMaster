// Builder
import MoveBuilder from './utils/moveBuilder';

// Classes
import Move from '../classes/move';

describe('Move', () => {
	let move: Move;

	beforeEach(() => {
		move = new MoveBuilder().default();
	});

	test('should have an id', () => {
		expect(move.id).toBeDefined();
	});

	test('should have a name', () => {
		expect(move.name).toBeDefined();
	});

	test('should have a power', () => {
		expect(move.power).toBeDefined();
	});

	test('should have an accuracy', () => {
		expect(move.accuracy).toBeDefined();
	});

	test('should have a pp', () => {
		expect(move.pp).toBeDefined();
	});

	test('should have a maxPp', () => {
		expect(move.maxPp).toBeDefined();
	});

	test('should have a meta', () => {
		expect(move.meta).toBeDefined();
	});

	test('should have a type', () => {
		expect(move.type).toBeDefined();
	});

	test('should have a category', () => {
		expect(move.category).toBeDefined();
	});

	test('should have a description', () => {
		expect(move.description).toBeDefined();
	});

	test('should have learnedBy', () => {
		expect(move.learnedBy).toBeDefined();
	});

	test('should have statsChange', () => {
		expect(move.statsChange).toBeDefined();
	});

	test('should have target', () => {
		expect(move.target).toBeDefined();
	});

	test('should decrease the pp', () => {
		const decreasedMove = move.decreasePP();
		expect(decreasedMove.pp).toBe(move.pp - 1);
	});
});
