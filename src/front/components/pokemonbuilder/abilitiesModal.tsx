// Interfaces
import { AbilityEntity } from '../../../interfaces/pokemon/ability/abilityEntity';
interface AbilitiesModalProps {
	setOpenAbilities: (openAbilities: boolean) => void;
	abilityActive: AbilityEntity;
	setAbilityActive: (ability: AbilityEntity) => void;
}

const AbilitiesModal = ({
	setOpenAbilities,
	abilityActive,
	setAbilityActive
}: AbilitiesModalProps) => {
	return <div>Modal</div>;
};

export default AbilitiesModal;
