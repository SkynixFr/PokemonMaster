import Team from '../classes/team';
import TeamBuilder from './utils/teamBuilder';

describe('Team', () => {
	let team: Team;

	beforeEach(() => {
		team = new TeamBuilder().default();
	});

	test('should have an id', () => {
		expect(team.id).toBeDefined();
	});

	test('should have a name', () => {
		expect(team.name).toBeDefined();
	});

	test('should have an avatar', () => {
		expect(team.avatar).toBeDefined();
	});

	test('should have pokemons', () => {
		expect(team.pokemons).toBeDefined();
	});
});
