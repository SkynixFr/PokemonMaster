// Actions
import { getTeam } from '../../../../front/actions/team.actions';
import { getPokemons } from '../../../../front/actions/pokemon.actions';

// Components
import Pokemons from '../../../../front/components/pokemonbuilder/pokemons';

const PokemonBuilder = async ({ params }: { params: { id: string } }) => {
	const team = await getTeam(params.id);
	const pokemons = await getPokemons();
	return (
		<div className={'pokemonbuilder-container'}>
			<Pokemons pokemons={pokemons} team={team} />
		</div>
	);
};

export default PokemonBuilder;
