import { AvatarEntity } from '../avatar/avatarEntity';
import { PokemonEntity } from '../pokemon/pokemonEntity';

export interface TeamEntity {
	id: string;
	name: string;
	avatar: AvatarEntity;
	pokemons: PokemonEntity[];
}
