import IAvatar from './IAvatar';
import IPokemon from './IPokemon';

export default interface ITeamResponse {
	id: string;
	name: string;
	avatar: IAvatar;
	pokemons: IPokemon[];
}

export interface ITeamEntity {
	name: string;
	avatarId: string;
}
