'use client';

import { useState } from 'react';

// Components
import NaturesModal from './naturesModal';

// Interfaces
import { AbilityEntity } from '../../../interfaces/pokemon/ability/abilityEntity';
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
import { ItemEntity } from '../../../interfaces/pokemon/item/itemEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';

interface PokemonCompetitiveInfosProps {
	abilityActive: AbilityEntity;
	natureActive: NatureEntity;
	itemActive: ItemEntity;
	pokemon: PokemonTeamEntity;
}

const PokemonCompetitiveInfos = ({
	abilityActive,
	natureActive,
	itemActive
}: PokemonCompetitiveInfosProps) => {
	const [openNature, setOpenNature] = useState<boolean>(false);

	return (
		<div className={'pokemon-competitive-infos'}>
			<div className="pokemon-item">
				<h3>Item</h3>
				<button>{itemActive ? itemActive.name : 'No item'}</button>
			</div>
			<div className="pokemon-nature">
				<h3>Nature</h3>
				<button onClick={() => setOpenNature(!openNature)}>
					{natureActive ? natureActive.name : 'No nature'}
				</button>
			</div>
			{openNature && <NaturesModal setOpenNature={setOpenNature} />}
			<div className="pokemon-ability">
				<h3>Ability</h3>
				<button>{abilityActive ? abilityActive.name : 'No ability'}</button>
			</div>
		</div>
	);
};

export default PokemonCompetitiveInfos;
