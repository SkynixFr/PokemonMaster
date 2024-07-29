import { PokemonTeamEntity } from '../pokemon/pokemonTeamEntity';

export interface TeamUpdate {
	name: string;
	avatarId: string;
	pokemons: PokemonTeamEntity[];
}
