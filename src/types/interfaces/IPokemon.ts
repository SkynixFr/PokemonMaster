import Pokemon, { Item, Move, Stat } from '../Pokemon';

export default interface IPokemon extends Pokemon{
	attack?: () => number;
}

export interface IMove extends Move{
	decreasePP?: () => void;
}

export interface IStat extends Stat{
	decreaseHp?: () => void;
}

export interface IItem extends Item{
	used?: boolean;
	use?: () => void;
}
