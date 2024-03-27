import IPokemon from './interfaces/IPokemon';

type Team = {
	id?: string;
	name: string;
	avatar: string;
	pokemons?: IPokemon[];
};

export default Team;
