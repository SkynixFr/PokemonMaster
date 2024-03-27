import IPokemon from '../types/interfaces/IPokemon';

class Team {
	private readonly pokemons: IPokemon[];
	private activePokemon: IPokemon;

	constructor(pokemons: IPokemon[], activePokemon: IPokemon) {
		this.pokemons = pokemons;
		this.activePokemon = activePokemon ? activePokemon : this.pokemons[0];
	}

	switch(index: number) {
		this.activePokemon = this.pokemons[index];
	}
}

export default Team;
