import React, { useEffect, useState } from 'react';

// Icons
import { X } from 'lucide-react';

// Interfaces
import { AbilityEntity } from '../../../interfaces/pokemon/ability/abilityEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';
interface AbilitiesModalProps {
	abilityActive: AbilityEntity;
	pokemon: PokemonTeamEntity;
	setAbilityActive: (ability: AbilityEntity) => void;
	setOpenAbilities: (openAbilities: boolean) => void;
}

// Actions
import { getAbilities } from '../../actions/ability.actions';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

const AbilitiesModal = ({
	setOpenAbilities,
	abilityActive,
	setAbilityActive,
	pokemon
}: AbilitiesModalProps) => {
	const [abilities, setAbilities] = useState<AbilityEntity[]>([]);

	useEffect(() => {
		const fetchAbilities = async () => {
			try {
				const fetchedAbilities = await getAbilities();
				const filteredAbilities = fetchedAbilities.filter(
					(ability: AbilityEntity) =>
						ability.learnedBy.includes(pokemon.name)
				);
				filteredAbilities.sort((a: AbilityEntity, b: AbilityEntity) =>
					a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
				);

				setAbilities(filteredAbilities);
			} catch (error) {
				console.error(error);
			}
		};
		fetchAbilities().then();
	}, []);

	return (
		<div className={'abilities-modal pokemon-infos-modal-container'}>
			<div className={'abilities-modal-container'}>
				<div className="abilities-modal-header">
					<h2>Abilities</h2>
				</div>
				<button
					className={'close-btn'}
					onClick={() => setOpenAbilities(false)}
				>
					<X width={30} height={30} />
				</button>
				<div className={'abilities-modal-body'}>
					<div className={'abilities-table-title'}>
						<div className={'abilities-table-title-name'}>Name</div>
						<div className={'abilities-table-tile-description'}>
							Description
						</div>
					</div>
					<div className="abilities-list">
						{abilities ? (
							abilities.map((ability: AbilityEntity) => (
								<div
									key={ability.name}
									className={`abilities-list-item ${
										abilityActive
											? abilityActive.name === ability.name
												? 'active'
												: ''
											: ''
									}`}
									onClick={() => {
										setAbilityActive(ability);
									}}
								>
									<div className={'ability-name'}>
										{firstLetterMaj(ability.name)}
									</div>
									<div className={'ability-description'}>
										{firstLetterMaj(ability.description)}
									</div>
								</div>
							))
						) : (
							<div>Loading...</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AbilitiesModal;
