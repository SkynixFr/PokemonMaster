import IPokemon from '../../../interfaces/IPokemon';
import ITeam from '../../../interfaces/ITeam';
import PokemonList from './pokemonList';

interface TeamProps {
	team: ITeam;
	removePokemonFromTeam?: (
		pokemon: IPokemon,
		teamName: string
	) => Promise<string>;
}

const Team = ({ team, removePokemonFromTeam }: TeamProps) => {
	console.log(team);
	return (
		<div>
			<h1>{team.name}</h1>

			{team.pokemons.length === 0 ? (
				<div>No pokemons in this team</div>
			) : (
				<ul>
					<PokemonList
						pokemons={team.pokemons}
						teamName={team.name}
						removePokemonFromTeam={removePokemonFromTeam}
					/>
				</ul>
			)}
		</div>
	);
};

export default Team;
