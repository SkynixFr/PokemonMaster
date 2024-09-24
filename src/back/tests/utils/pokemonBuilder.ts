// Builder
import StatBuilder from './statBuilder';
import MoveBuilder from './moveBuilder';

// Classes
import Pokemon from '../../classes/pokemon';
import Stat from '../../classes/stat';
import Move from '../../classes/move';

class PokemonBuilder {
	pokedexId: number = 6;
	name: string = 'Charizard';
	types: Type[] = [new TypeBuilder().default()];
	level: number = 100;
	ability: string = 'blaze';
	nature: string;
	gender: string;
	isShiny: boolean = false;
	moves: Move[] = [new MoveBuilder().default()];
	item: string;
	stats: Stat[] = [
		new StatBuilder().default(),
		new StatBuilder().withName('attack').withValue(25).build()
	];
	weight: number = 90.5;
	activeMove: Move;
	status: string;
	volatileStatus: string;
	index: number;

	default(): Pokemon {
		return new PokemonBuilder().build();
	}

	build(): Pokemon {
		return new Pokemon(
			this.pokedexId,
			this.name,
			this.types,
			this.level,
			this.ability,
			this.nature,
			this.gender,
			this.isShiny,
			this.moves,
			this.item,
			this.stats,
			this.weight,
			this.activeMove,
			this.status,
			this.volatileStatus,
			this.index
		);
	}

	withName(name: string): PokemonBuilder {
		this.name = name;
		return this;
	}

	withStats(stats: Stat[]): PokemonBuilder {
		this.stats = stats;
		return this;
	}

	withMoves(moves: Move[]): PokemonBuilder {
		this.moves = moves;
		return this;
	}
}

export default PokemonBuilder;
