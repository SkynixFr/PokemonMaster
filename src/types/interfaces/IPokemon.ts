import Pokemon, { Item, Move, Stat } from '../Pokemon';

interface IPokemon extends Pokemon{
	currentHp?: number;
	attack?: () => number;
}

export interface IMove extends Move {
	decreasePP?: () => void;
}

export interface IStat extends Stat{
	currentHp?: number;
	decreaseHp?: () => void;
}

export interface IItem extends Item{
	used?: boolean;
	use?: () => void;
}

export default IPokemon;