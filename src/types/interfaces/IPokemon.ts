import Pokemon, { Item, Move, Stat } from '../Pokemon';

export default interface IPokemon {
	pokemon: Pokemon;
	attack?: () => number;
}

export interface IMove extends Move {
	decreasePP?: () => void;
}

export interface IStat {
	stats: Stat;
}

export interface IItem {
	item: Item;
	used?: boolean;
	use?: () => void;
}
