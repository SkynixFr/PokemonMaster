// Interfaces
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';
interface NaturesModalProps {
	natures: NatureEntity[];
	pokemon: PokemonTeamEntity;
}

const NaturesModal = ({ natures, pokemon }: NaturesModalProps) => {
	return (
		<div className={'natures-modal'}>
			<div className="natures-modal-header">
				<h2>Natures</h2>
				<h4>{pokemon.name}</h4>
			</div>
			<div className="natures-modal-body">
				<ul>
					{natures.map(nature => (
						<li key={nature.id}>{nature.name}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default NaturesModal;
