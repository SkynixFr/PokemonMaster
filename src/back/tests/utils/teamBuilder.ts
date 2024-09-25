import Team from '../../classes/team';
import Pokemon from '../../classes/pokemon';
import PokemonBuilder from './pokemonBuilder';

class TeamBuilder {
	id: string = '1';
	name: string = 'Red';
	avatar: {
		id: string;
		name: string;
		region: string;
		sprite: string;
	} = {
		id: '1',
		name: 'Red',
		region: 'Kanto',
		sprite: 'red.png'
	};
	pokemons: Pokemon[] = [new PokemonBuilder().default()];

	default(): Team {
		return new TeamBuilder().build();
	}

	build(): Team {
		return new Team(this.id, this.name, this.avatar, this.pokemons);
	}
}

export default TeamBuilder;
