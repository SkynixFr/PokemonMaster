import Team from './team';
import Pokemon from './pokemon';

class Battle {
	readonly playerTeam: Team;
	readonly opponentTeam: Team;
	readonly activePlayerPokemon: Pokemon;
	readonly activeOpponentPokemon: Pokemon;
	readonly turn: number;

	constructor(
		playerTeam: Team,
		opponentTeam: Team,
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon,
		turn: number
	) {
		this.playerTeam = playerTeam;
		this.opponentTeam = opponentTeam;
		this.activePlayerPokemon = activePlayerPokemon;
		this.activeOpponentPokemon = activeOpponentPokemon;
		this.turn = turn;
	}
}

export default Battle;
