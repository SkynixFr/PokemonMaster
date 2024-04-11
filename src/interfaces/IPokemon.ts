import IStat from './IStat';
import IMove from './IMove';
import IType from './iType';
import IAbility from './IAbility';
import IItem from './IItem';
import IStatus from './IStatus';

export default interface IPokemonEntity {
	name: string;
	stats: IStat[];
	moves: IMove[];
	status?: IStatus;
	types?: IType[];
	item?: IItem;
	ability?: IAbility;
	nature?: string;
	gender?: 'Male' | 'Female' | 'Neutral';
	isShiny?: boolean;
	level?: number;
	sprite?: string;
	id?: number;
	attack?(opponentPokemon: IPokemonEntity, move: IMove): IPokemonEntity;
	heal?(): IPokemonEntity;
}

export interface IPokemonAPI {
	name: string;
	stats?: IStat[];
	moves?: IMove[];
}

export interface IPokemonPokedex {
	name: string;
	id: number;
	sprite: string;
	types: IType[];
}

export interface IPokemonRequest {
	results: IPokemonPokedex[];
	next: string | null;
	previous: string | null;
}
