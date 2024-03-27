import Pokemon, { Item, Move, Stat } from '../Pokemon';

interface IPokemon extends Pokemon{
	attack?: (pokemon: Pokemon, move: IMove) => number;
}

export interface IMove extends Move {
	decreasePP?: () => void;
}

export interface IStat extends Stat{
	currentHp?: number;
	decreaseHp?: (damage: number) => number;
}

export interface IItem extends Item{
	used?: boolean;
	use?: () => void;
}

export default IPokemon;