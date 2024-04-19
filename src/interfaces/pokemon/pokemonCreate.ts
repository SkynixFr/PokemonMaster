import { StatEntity } from './stat/statEntity';
import { TypeEntity } from './type/typeEntity';

export interface PokemonCreate {
	pokedexId: number;
	name: string;
	types: TypeEntity[];
	gender: 'male' | 'female' | 'neutral';
	stats: StatEntity[];
	weight: number;
}
