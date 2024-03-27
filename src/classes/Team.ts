import IPokemon from '../types/interfaces/IPokemon';
import ITeam from '../types/interfaces/ITeam';

class Team {
	readonly id: number;
	readonly name: string;
	readonly avatar: string;
	readonly pokemons: IPokemon[];
	activePokemon: IPokemon;

	constructor(team: ITeam) {
		this.id = team.id;
		this.name = team.name;
		this.avatar = team.avatar;
		this.pokemons = team.pokemons;
		this.activePokemon = team.activePokemon
			? team.activePokemon
			: this.pokemons[0];
	}

	switch(pokemon: IPokemon) {
		this.activePokemon = pokemon;
	}

	getActivePokemon() {
		return this.activePokemon;
	}
}

export default Team;
