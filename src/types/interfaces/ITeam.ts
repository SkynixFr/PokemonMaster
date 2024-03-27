import Team from '../Team';
import IPokemon from './IPokemon';

export default interface ITeam extends Team{
	switch?: (pokemon: IPokemon) => void;
}
