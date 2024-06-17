// Interfaces
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';
interface PokemonNaturesProps {
	pokemon: PokemonTeamEntity;
}

// Components
import NaturesModal from './naturesModal';

// Actions
import { getNatures } from '../../actions/nature.actions';

const PokemonNatures = async ({ pokemon }: PokemonNaturesProps) => {
	const natures = await getNatures();
	console.log(natures);
	// return <NaturesModal natures={natures} pokemon={pokemon} />;
	return <div></div>;
};

export default PokemonNatures;
