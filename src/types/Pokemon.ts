import { IMove, IStat, IItem } from './interfaces/IPokemon';

type Pokemon = {
	id: number;
	name: string;
	moves?: IMove[];
	nature?: string;
	level?: number;
	gender?: string;
	isShiny?: boolean;
	types?: Type[];
	stats?: IStat;
	ability?: Ability;
	item?: IItem;
};

export type Type = {
	name: string;
};

export type Move = {
	name: string;
	type: Type;
	category: string;
	power: number;
	accuracy: number;
	pp: number;
	description: string;
	effect: string;
};

export type Stat = {
	hp: number;
	attack: number;
	defense: number;
	spAttack: number;
	spDefense: number;
	speed: number;
	ev?: number;
	iv?: number;
};

export type Ability = {
	name: string;
	description: string;
};

export type Item = {
	name: string;
	description: string;
	image: string;
};

export default Pokemon;
