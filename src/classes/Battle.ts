import ITeam from '../types/interfaces/ITeam';
import IPokemon from '../types/interfaces/IPokemon';

class Battle {
	hostTeam: ITeam;
	guestTeam: ITeam;
	turn: number;

	constructor(hostTeam: ITeam, guestTeam: ITeam, turn: number) {
		this.hostTeam = hostTeam;
		this.guestTeam = guestTeam;
		this.turn = turn ? turn : 0;
	}
}

export default Battle;
