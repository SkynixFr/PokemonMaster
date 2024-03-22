import Pokemon from './Pokemon';

type Team = {
	id?: string;
	name: string;
	avatar: string;
	pokemons?: Pokemon[];
};

export default Team;
