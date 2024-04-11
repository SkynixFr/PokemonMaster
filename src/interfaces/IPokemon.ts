import IStat from './IStat';
import IMove from './IMove';
import IType from './iType';
import IAbility from './IAbility';
import IItem from './IItem';
import IStatus from './IStatus';

export default interface IPokemon {
	name: string;
	stats: IStat[];
	moves: IMove[];
	status?: IStatus;
	types?: IType[];
	item?: IItem;
	ability?: IAbility;
	nature?: string;
	gender?: string;
	isShiny?: boolean;
	level?: number;
	sprite?: string;
	id?: number;
	attack?(opponentPokemon: IPokemon, move: IMove): IPokemon;
	heal?(): IPokemon;
}

export interface IPokemonAPI {
	name: string;
	stats?: IStat[];
	moves?: IMove[];
}
