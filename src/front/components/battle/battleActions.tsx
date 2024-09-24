import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import CustomImage from '../customImage';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

// Classes
import Pokemon from '../../../back/classes/pokemon';
import Move from '../../../back/classes/move';

// Interfaces
interface BattleActionsProps {
	playerPokemon: Pokemon;
	handleMoveSelection: (move: Move) => void;
	disabled: boolean;
	setBattleEnd: (value: boolean) => void;
	currentView: string;
	setPlayerRunning: (value: boolean) => void;
	setOpponentRunning: (value: boolean) => void;
}
const BattleActions = ({
	playerPokemon,
	handleMoveSelection,
	disabled,
	setBattleEnd,
	currentView,
	setPlayerRunning,
	setOpponentRunning
}: BattleActionsProps) => {
	const [openModalRunning, setOpenModalRunning] = useState<boolean>(false);
	const [openPokemonMoves, setOpenPokemonMoves] = useState<boolean>(false);

	const handlePlayerRunning = () => {
		if (currentView === 'player') {
			setPlayerRunning(true);
			setBattleEnd(true);
			setOpenModalRunning(false);
		} else {
			setOpponentRunning(true);
			setBattleEnd(true);
			setOpenModalRunning(false);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenModalRunning(false);
				setOpenPokemonMoves(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpenModalRunning, setOpenPokemonMoves]);

	return (
		<div className={'battle-actions'}>
			<div className={'battle-actions-btn fadeInToTop'}>
				<button
					className={`btn-action ${disabled ? 'disabled' : ''}`}
					onClick={() => setOpenPokemonMoves(!openPokemonMoves)}
					disabled={disabled}
				>
					Attack
					<CustomImage
						src={'/images/other/battle.png'}
						alt={'battle icon'}
						width={75}
						height={75}
					/>
				</button>
				<button
					className={`btn-action`}
					onClick={() => setOpenModalRunning(!openModalRunning)}
				>
					Run
					<CustomImage
						src={'/images/other/run.png'}
						alt={'run icon'}
						width={75}
						height={75}
					/>
				</button>
				{openPokemonMoves && (
					<div className={'pokemon-moves-modal-container'}>
						<div className={`pokemon-moves-modal-content fadeInToTop`}>
							{playerPokemon.moves.map((move, index) => (
								<button
									className={'pokemon-move-fullfilled'}
									key={index}
									onClick={() => {
										handleMoveSelection(move);
										setOpenPokemonMoves(false);
									}}
								>
									<CustomImage
										src={`/images/types/${move.type}.png`}
										alt={'Move icon'}
										width={25}
										height={25}
									/>
									<div className={'pokemon-move-fullfilled infos'}>
										<div className={'pokemon-move-fullfilled-name'}>
											{firstLetterMaj(move.name)}
										</div>
										<div>
											{move.pp}/{move.pp}
										</div>
									</div>
								</button>
							))}
						</div>
					</div>
				)}
			</div>

			{openModalRunning && (
				<div className={'modal-running-container'}>
					<div className={'modal-running-content'}>
						<h1>Are you sure you want to run?</h1>
						<span>
							You will lose the battle and your progress will be lost.
						</span>
						<div className={'modal-running-btn-container'}>
							<button
								className={'btn-secondary'}
								onClick={handlePlayerRunning}
							>
								Yes
							</button>
							<button
								className={'btn-primary'}
								onClick={() => setOpenModalRunning(false)}
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BattleActions;
