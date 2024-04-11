import IAvatar from './IAvatar';
import IPokemon from './IPokemon';

export default interface ITeamResponse {
	id: string;
	name: string;
	avatar: IAvatar;
	pokemons: IPokemon[];
}

export interface ITeamCreate {
	name: string;
	avatarId: string;
}

export interface ITeamUpdate {
	name: string;
	avatarId: string;
	pokemons: IPokemon[];
}
