import ITeam from '../types/interfaces/ITeam';

class Battle {
	private hostTeam: ITeam;
	private guestTeam: ITeam;
	private turn: number;

	constructor(hostTeam: ITeam, guestTeam: ITeam, turn: number) {
		this.hostTeam = hostTeam;
		this.guestTeam = guestTeam;
		this.turn = turn ? turn : 0;
	}
}

export default Battle;
