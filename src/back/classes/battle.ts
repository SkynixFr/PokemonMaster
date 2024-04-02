// Interfaces
import IBattle from '../../interfaces/IBattle';

// Classes
import Pokemon from './pokemon';

class Battle implements IBattle {
	readonly opponentPokemon: Pokemon;
	readonly playerPokemon: Pokemon;

	constructor(opponentPokemon: Pokemon, playerPokemon: Pokemon) {
		this.opponentPokemon = opponentPokemon;
		this.playerPokemon = playerPokemon;
	}
}

export default Battle;
