import Pokemon, { Item, Move, Stat } from '../Pokemon';

interface IPokemon extends Pokemon{
	currentHp?: number;
	attack?: (pokemon: Pokemon, move: IMove) => void;
}

export interface IMove extends Move {
	decreasePP?: () => void;
}

export interface IStat extends Stat{
	currentHp?: number;
	decreaseHp?: (damage: number) => void;
}

export interface IItem extends Item{
	used?: boolean;
	use?: () => void;
}

export default IPokemon;