import Team from '../Team';
import ITeam from './ITeam';

export default interface IBattle {
	host: ITeam;
	guest: ITeam;
}
