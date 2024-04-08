import ITeam from '../../../interfaces/ITeam';
import PokemonList from './pokemonList';

interface TeamProps {
	team: ITeam;
}

const Team = ({ team }: TeamProps) => {
	console.log(team);
	return (
		<div>
			<h1>{team.name}</h1>

			{team.pokemons.length === 0 ? (
				<div>No pokemons in this team</div>
			) : (
				<ul>
					<PokemonList pokemons={team.pokemons} />
				</ul>
			)}
		</div>
	);
};

export default Team;
