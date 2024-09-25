import Status from '../classes/status';
import StatusBuilder from './utils/statusBuilder';

describe('Status', () => {
	let status: Status;

	beforeEach(() => {
		status = new StatusBuilder().default();
	});

	test('should have a name', () => {
		expect(status.name).toBeDefined();
	});

	test('should have a description', () => {
		expect(status.description).toBeDefined();
	});

	test('should have a counter', () => {
		expect(status.counter).toBeDefined();
	});

	test('should have a ableToMove', () => {
		expect(status.ableToMove).toBeDefined();
	});

	test('should be able to change ableToMove', () => {
		const newStatus = status.setAbleToMove(false);
		expect(newStatus.ableToMove).toBe(false);
	});

	test('should be able to change counter', () => {
		const newStatus = status.setCounter(2);
		expect(newStatus.counter).toBe(2);
	});
});
