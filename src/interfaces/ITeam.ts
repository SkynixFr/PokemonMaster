import IAvatar from './IAvatar';
import IPokemon from './IPokemon';

export default interface ITeam {
	id?: string;
	name: string;
	avatar: IAvatar;
	pokemons: IPokemon[];
}
