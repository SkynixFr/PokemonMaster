import IPokemon from './interfaces/IPokemon';

type Team = {
	id?: number;
	name: string;
	avatar: string;
	pokemons?: IPokemon[];
};

export default Team;
