import { AvatarEntity } from '../avatar/avatarEntity';
import { PokemonCreate } from '../pokemon/pokemonCreate';

export interface TeamEntity {
	id: number;
	name: string;
	avatar: AvatarEntity;
	pokemons: PokemonCreate[];
}
