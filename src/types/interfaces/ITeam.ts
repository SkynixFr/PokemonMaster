import Team from '../Team';
import IPokemon from './IPokemon';

export default interface ITeam {
	team: Team;
	switch?: (pokemon: IPokemon) => void;
}
