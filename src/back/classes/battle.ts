// Interfaces
import IBattle from '../../interfaces/IBattle';

// Classes
import Pokemon from './pokemon';

class Battle implements IBattle {
	readonly playerPokemon: Pokemon;
	readonly opponentPokemon: Pokemon;

	constructor(playerPokemon: Pokemon, opponentPokemon: Pokemon) {
		this.playerPokemon = playerPokemon;
		this.opponentPokemon = opponentPokemon;
	}
}

export default Battle;
