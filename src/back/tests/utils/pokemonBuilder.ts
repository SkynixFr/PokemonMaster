// Builder
import StatBuilder from './statBuilder';
import MoveBuilder from './moveBuilder';

// Classes
import Pokemon from '../../classes/pokemon';
import Stat from '../../classes/stat';
import Move from '../../classes/move';

class PokemonBuilder {
	name: string = 'Charizard';
	stats: Stat[] = [
		new StatBuilder().default(),
		new StatBuilder().withName('attack').withValue(25).build()
	];
	moves: Move[] = [new MoveBuilder().default()];

	default(): Pokemon {
		return new PokemonBuilder().build();
	}

	build(): Pokemon {
		return new Pokemon(this.name, this.stats, this.moves);
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
