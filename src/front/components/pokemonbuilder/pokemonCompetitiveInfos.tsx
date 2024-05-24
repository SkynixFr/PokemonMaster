// Interfaces
import { AbilityEntity } from '../../../interfaces/pokemon/ability/abilityEntity';
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
import { ItemEntity } from '../../../interfaces/pokemon/item/itemEntity';
interface PokemonCompetitiveInfosProps {
	abilityActive: AbilityEntity;
	natureActive: NatureEntity;
	itemActive: ItemEntity;
}

const PokemonCompetitiveInfos = ({
	abilityActive,
	natureActive,
	itemActive
}: PokemonCompetitiveInfosProps) => {
	return (
		<div className={'pokemon-competitive-infos'}>
			<div className="pokemon-item">
				<h3>Item</h3>
				<button>{itemActive ? itemActive.name : 'No item'}</button>
			</div>
			<div className="pokemon-nature">
				<h3>Nature</h3>
				<button>{natureActive ? natureActive.name : 'No nature'}</button>
			</div>
			<div className="pokemon-ability">
				<h3>Ability</h3>
				<button>{abilityActive ? abilityActive.name : 'No ability'}</button>
			</div>
		</div>
	);
};

export default PokemonCompetitiveInfos;
