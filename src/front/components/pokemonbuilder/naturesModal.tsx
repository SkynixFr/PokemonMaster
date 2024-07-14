import React, { useEffect, useState } from 'react';

// Interfaces
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';
interface NaturesModalProps {
	setOpenNature: (openNature: boolean) => void;
}

// Actions
import { getNatures } from '../../actions/nature.actions';
import { X } from 'lucide-react';

const NaturesModal = ({ setOpenNature }: NaturesModalProps) => {
	const [natures, setNatures] = useState<NatureEntity[]>([]);

	async function getNaturesFromServer() {
		const natures = await getNatures();
		return natures;
	}

	useEffect(() => {
		const fetchNatures = async () => {
			const natures = await getNaturesFromServer();
		};
		fetchNatures().then(
			() => setNatures(natures),
			() => console.log('Error fetching natures')
		);
	}, []);

	return (
		<div className={'natures-modal'}>
			<div className={'natures-modal-container'}>
				<div className="natures-modal-header">
					<h2>Natures</h2>
				</div>
				<button
					className={'close-btn'}
					onClick={() => setOpenNature(false)}
				>
					<X width={30} height={30} />
				</button>
				<div className="natures-modal-body">
					<ul>
						{natures ? (
							natures.map(nature => (
								<li key={nature.id}>{nature.name}</li>
							))
						) : (
							<h3>No natures available</h3>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default NaturesModal;
