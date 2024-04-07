import IStat from './IStat';
import IMove from './IMove';

export default interface IPokemon {
	name: string;
	stats: IStat[];
	moves: IMove[];
	attack?(opponentPokemon: IPokemon, move: IMove): IPokemon;
	heal?(): IPokemon;
}

export interface IPokemonAPI {
	name: string;
	stats?: IStat[];
	moves?: IMove[];
}
