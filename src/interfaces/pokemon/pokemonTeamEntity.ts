import { TypeEntity } from './type/typeEntity';
import { AbilityEntity } from './ability/abilityEntity';
import { NatureEntity } from './nature/natureEntity';
import { MoveEntity } from './move/moveEntity';
import { ItemEntity } from './item/itemEntity';
import { StatEntity } from './stat/statEntity';

export interface PokemonTeamEntity {
	pokedexId: number;
	name: string;
	types: TypeEntity[];
	level: number;
	ability: AbilityEntity;
	nature: NatureEntity;
	gender: 'Male' | 'Female' | 'Neutral';
	isShiny: boolean;
	moves: MoveEntity[];
	item: ItemEntity;
	stats: StatEntity[];
	weight: number;
}
