import Pokemon from "../Pokemon";

export default interface IPokemon {
	pokemon: Pokemon;
	attack?: () => number;
};

export interface IType {
	name: string;
}

export interface IMove{
	name: string;
	type: IType;
	category: string;
	power: number;
	accuracy: number;
	pp: number;
	description: string;
	effect: string;
	decreasePP?: () => void;
}

export interface IStat {
	hp: number;
	attack: number;
	defense: number;
	spAttack: number;
	spDefense: number;
	speed: number;
	ev?: number;
	iv?: number;
}

export interface IItem {
	name: string;
	description: string;
	image: string;
	used?: boolean;
	use?: () => void;
}

