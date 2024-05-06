import { TypeEntity } from './type/typeEntity';
import { StatEntity } from './stat/statEntity';
import { AbilityEntity } from './ability/abilityEntity';
import { NatureEntity } from './nature/natureEntity';
import { MoveEntity } from './move/moveEntity';
import { ItemEntity } from './item/itemEntity';

export interface PokemonEntity {
	pokedexId: number;
	name: string;
	types: TypeEntity[];
	level: number;
	abilities: AbilityEntity[];
	nature: NatureEntity;
	gender: 'Male' | 'Female' | 'Neutral';
	isShiny: boolean;
	moves: MoveEntity[];
	item: ItemEntity;
	stats: StatEntity[];
	weight: number;
}
