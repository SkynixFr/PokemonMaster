import Team from '../Team';
import IPokemon from './IPokemon';

export default interface ITeam {
	team: Team;
	changeActivePokemon?: (pokemon: IPokemon) => void;
}
