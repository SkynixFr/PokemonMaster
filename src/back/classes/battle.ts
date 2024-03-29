// Classes
import Pokemon from './pokemon';

class Battle {
	readonly opponentPokemon: Pokemon;
	readonly playerPokemon: Pokemon;

	constructor(opponentPokemon: Pokemon, playerPokemon: Pokemon) {
		this.opponentPokemon = opponentPokemon;
		this.playerPokemon = playerPokemon;
	}
}

export default Battle;
