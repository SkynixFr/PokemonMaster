import Pokemon from './pokemon';

class Battle {
	readonly playerPokemon: Pokemon;
	readonly opponentPokemon: Pokemon;

	constructor(playerPokemon: Pokemon, opponentPokemon: Pokemon) {
		this.playerPokemon = playerPokemon;
		this.opponentPokemon = opponentPokemon;
	}
}

export default Battle;
