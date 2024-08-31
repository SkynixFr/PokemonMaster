import Team from './team';

class Battle {
	readonly playerTeam: Team;
	readonly opponentTeam: Team;

	constructor(playerTeam: Team, opponentTeam: Team) {
		this.playerTeam = playerTeam;
		this.opponentTeam = opponentTeam;
	}
}

export default Battle;
