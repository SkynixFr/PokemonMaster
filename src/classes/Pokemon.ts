import IPokemon, { IMove, IItem, IStat} from "../types/interfaces/IPokemon";
import {Type, Ability} from "../types/Pokemon";

class Pokemon {
    id: number;
	name: string;
	moves?: IMove[];
	nature?: string;
	level?: number;
	gender?: string;
	isShiny?: boolean;
	types?: Type[];
	stats?: IStat;
	ability?: Ability;
	item?: IItem;

    constructor(pokemon: IPokemon){
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.moves = pokemon.moves;
        this.nature = pokemon.nature;
        this.level = pokemon.level;
        this.gender = pokemon.gender;
        this.isShiny = pokemon.isShiny;
        this.types = pokemon.types;
        this.stats = pokemon.stats;
        this.ability = pokemon.ability;
        this.item = pokemon.item;
    }
    
    attack(pokemon: Pokemon, move: IMove){
       pokemon.stats.decreaseHp(move.power);
    }
}

export default Pokemon;