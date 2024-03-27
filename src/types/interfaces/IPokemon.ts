import Pokemon from "../Pokemon"
import { Ability, Sprites } from "../Pokemon";

export default interface IPokemon {
	pokemon: Pokemon;
	attack?: () => number;
};

interface IType {
	name: string;
}

interface IMove{
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

interface IStat {
	hp: number;
	attack: number;
	defense: number;
	spAttack: number;
	spDefense: number;
	speed: number;
	ev?: number;
	iv?: number;
}

interface IItem {
	name: string;
	description: string;
	image: string;
	used?: boolean;
	use?: () => void;
}

