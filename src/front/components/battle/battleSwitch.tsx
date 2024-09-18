import { firstLetterMaj } from '../../utils/formatString';
import React from 'react';
import Pokemon from '../../../back/classes/pokemon';

interface BattleSwitchingProps {
	setIsSwitching: (isSwitching: boolean) => void;
	isSwitchingTo: Pokemon;
	handleSwitchPokemon: (pokemon: Pokemon) => void;
}

const battleSwitch = ({
	setIsSwitching,
	isSwitchingTo,
	handleSwitchPokemon
}: BattleSwitchingProps) => {
	return (
		<div className={'modal-switching-container'}>
			<div className={'modal-switching-content'}>
				<h1>
					Are you sure you want to switch to{' '}
					{firstLetterMaj(isSwitchingTo.name)} ?
				</h1>
				<span>A switch will be considered as a turn.</span>
				<div className={'modal-switching-btn-container'}>
					<button
						className={'btn-secondary'}
						onClick={() => handleSwitchPokemon(isSwitchingTo)}
					>
						Yes
					</button>
					<button
						className={'btn-primary'}
						onClick={() => setIsSwitching(false)}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default battleSwitch;
