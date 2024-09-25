import PokemonBuilder from './pokemonBuilder';
import TeamBuilder from './teamBuilder';
import Battle from '../../classes/battle';

class BattleBuilder {
	playerTeam = new TeamBuilder().default();
	opponentTeam = new TeamBuilder().default();
	activePlayerPokemon = new PokemonBuilder().default();
	activeOpponentPokemon = new PokemonBuilder().default();
	turn = 1;

	default(): Battle {
		return new BattleBuilder().build();
	}

	build(): Battle {
		return new Battle(
			this.playerTeam,
			this.opponentTeam,
			this.activePlayerPokemon,
			this.activeOpponentPokemon,
			this.turn
		);
	}
}

export default BattleBuilder;
