import ITeam from './ITeam';

export default interface IBattle {
	hostTeam: ITeam;
	guestTeam: ITeam;
	turn: number;
}
