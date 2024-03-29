// Builder
import PokemonBuilder from './pokemonBuilder';
import StatBuilder from './statBuilder';
import MoveBuilder from './moveBuilder';

// Classes
import Battle from '../../classes/battle';

class BattleBuilder {
	playerPokemon = new PokemonBuilder().default();
	opponentPokemon = new PokemonBuilder()
		.withName('Bulbasaur')
		.withStats([
			new StatBuilder().default(),
			new StatBuilder().withName('attack').withValue(10).build()
		])
		.withMoves([new MoveBuilder().withName('Tackle').withPower(10).build()])
		.build();

	default(): Battle {
		return new BattleBuilder().build();
	}

	build(): Battle {
		return new Battle(this.playerPokemon, this.opponentPokemon);
	}
}

export default BattleBuilder;
