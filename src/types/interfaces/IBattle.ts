import ITeam from './ITeam';
import IPokemon from './IPokemon';

export default interface IBattle {
	hostTeam: ITeam;
	guestTeam: ITeam;
	turn: number;
}
