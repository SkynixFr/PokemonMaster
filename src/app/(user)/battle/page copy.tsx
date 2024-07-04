'use client';

import { use, useEffect, useState } from 'react';

// Classes
import Pokemon from '../../../back/classes/pokemon';
import BattleClass from '../../../back/classes/battle';
import Move from '../../../back/classes/move';
import Status from '../../../back/classes/status';
import MetaEntity from '../../../back/classes/meta';

// Interfaces
interface BattleProps {
	battle: BattleClass;
}

// Constants
const MAX_TURNS_ASLEEP = 3;
// const THAW_CHANCE = 0.2;
// const PARALYSIS_MOVE_CHANCE = 0.25;
// const MAX_TURNS_CONFUSED = 4;
// const CONFUSION_MOVE_CHANCE = 0.5;
// const CONFUSION_MOVE = new Move('Confusion', 40, 10, new MetaEntity(), 'user');

const Battle = ({ battle }: BattleProps) => {
	const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>();
	const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>();
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [opponentReady, setOpponentReady] = useState<boolean>(false);
	const [playerSelectedMove, setPlayerSelectedMove] = useState<Move>();
	const [opponentSelectedMove, setOpponentSelectedMove] = useState<Move>();
	const [battleWinner, setBattleWinner] = useState<string>('');
	const [playerMovesShowed, setPlayerMovesShowed] = useState<boolean>(false);
	const [opponentMovesShowed, setOpponentMovesShowed] =
		useState<boolean>(false);
	// const [playerSleepCounter, setPlayerSleepCounter] = useState<number>(0);
	// const [opponentSleepCounter, setOpponentSleepCounter] = useState<number>(0);
	// const [playerThawChance, setPlayerThawChance] = useState<number>(0);
	// const [opponentThawChance, setOpponentThawChance] = useState<number>(0);
	// const [poisonDamagesStep, setPoisonDamagesStep] = useState<boolean>(false);
	// const [burnDamagesStep, setBurnDamagesStep] = useState<boolean>(false);
	// const [playerMoveWhileParalyzedChance, setPlayerMoveWhileParalyzedChance] =
	// 	useState<number>(0);
	// const [
	// 	opponentMoveWhileParalyzedChance,
	// 	setOpponentMoveWhileParalyzedChance
	// ] = useState<number>(0);
	// const [playerMoveWhileParalyzed, setPlayerMoveWhileParalyzed] =
	// 	useState<boolean>(false);
	// const [opponentMoveWhileParalyzed, setOpponentMoveWhileParalyzed] =
	// 	useState<boolean>(false);
	// const [playerConfusionCounter, setPlayerConfusionCounter] =
	// 	useState<number>(0);
	// const [opponentConfusionCounter, setOpponentConfusionCounter] =
	// 	useState<number>(0);
	// const [playerMoveWhileConfused, setPlayerMoveWhileConfused] =
	// 	useState<boolean>(false);
	// const [opponentMoveWhileConfused, setOpponentMoveWhileConfused] =
	// 	useState<boolean>(false);

	// Récupération des pokémons depuis le localStorage ou la room
	useEffect(() => {
		if (!battle) return;
		if (
			localStorage.getItem('playerPokemon') &&
			localStorage.getItem('opponentPokemon')
		) {
			const parsedPlayerPokemon = JSON.parse(
				localStorage.getItem('playerPokemon')
			);
			const parsedOpponentPokemon = JSON.parse(
				localStorage.getItem('opponentPokemon')
			);
			setPlayerPokemon(
				new Pokemon(
					parsedPlayerPokemon.name,
					parsedPlayerPokemon.stats,
					parsedPlayerPokemon.moves,
					parsedPlayerPokemon.status,
					parsedPlayerPokemon.volatileStatus
				)
			);
			setOpponentPokemon(
				new Pokemon(
					parsedOpponentPokemon.name,
					parsedOpponentPokemon.stats,
					parsedOpponentPokemon.moves,
					parsedOpponentPokemon.status,
					parsedOpponentPokemon.volatileStatus
				)
			);
		} else {
			setPlayerPokemon(battle.playerPokemon);
			setOpponentPokemon(battle.opponentPokemon);
		}
	}, [battle]);

	// // Gestion des statuts KO, SLP, FRZ, PAR => le joueur ne peut pas attaquer
	// useEffect(() => {
	// 	if (!playerPokemon || !opponentPokemon) return;
	// 	if (
	// 		playerPokemon.status.name === 'KO' ||
	// 		playerPokemon.status.name === 'SLP' ||
	// 		playerPokemon.status.name === 'FRZ' ||
	// 		playerPokemon.status.name === 'PAR'
	// 	) {
	// 		console.log(playerPokemon.status.ableToMove);
	// 		let updatedPokemon = playerPokemon.setAbleToMove(false);
	// 		console.log(updatedPokemon);
	// 		setPlayerPokemon(updatedPokemon);
	// 		console.log(playerPokemon.status.ableToMove);
	// 		localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
	// 		console.log(playerPokemon.status.ableToMove);
	// 	}
	// 	if (
	// 		opponentPokemon.status.name === 'KO' ||
	// 		opponentPokemon.status.name === 'SLP' ||
	// 		opponentPokemon.status.name === 'FRZ' ||
	// 		opponentPokemon.status.name === 'PAR'
	// 	) {
	// 		let updatedPokemon = opponentPokemon.setAbleToMove(false);
	// 		setOpponentPokemon(updatedPokemon);
	// 		localStorage.setItem(
	// 			'opponentPokemon',
	// 			JSON.stringify(updatedPokemon)
	// 		);
	// 	}
	// }, [playerPokemon?.status.name, opponentPokemon?.status.name]);

	// // Reset du status sleep quand le compteur arrive à zéro
	// useEffect(() => {
	// 	setPlayerPokemon(playerPokemon?.updateStatusCounter(playerSleepCounter));
	// 	setOpponentPokemon(
	// 		opponentPokemon?.updateStatusCounter(opponentSleepCounter)
	// 	);
	// 	if (playerSleepCounter === 0 && playerPokemon?.status.name === 'SLP') {
	// 		let updatedPokemon = playerPokemon?.changeStatus(new Status('', ''));
	// 		updatedPokemon = updatedPokemon.setAbleToMove(true);
	function storePlayerPokemon(updatedPokemon: Pokemon) {
		setPlayerPokemon(updatedPokemon);
		localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
	}
	function storeOpponentPokemon(updatedPokemon: Pokemon) {
		setOpponentPokemon(updatedPokemon);
		localStorage.setItem('opponentPokemon', JSON.stringify(updatedPokemon));
	}
	function storeBothPokemons(
		updatedPlayerPokemon: Pokemon,
		updatedOpponentPokemon: Pokemon
	) {
		storePlayerPokemon(updatedPlayerPokemon);
		storeOpponentPokemon(updatedOpponentPokemon);
	}
	// 		setPlayerPokemon(updatedPokemon);
	// 		localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
	// 	}
	// 	if (
	// 		opponentSleepCounter === 0 &&
	// 		opponentPokemon?.status.name === 'SLP'
	// 	) {
	// 		let updatedPokemon = opponentPokemon?.changeStatus(new Status('', ''));
	// 		updatedPokemon = updatedPokemon.setAbleToMove(true);
	// 		setOpponentPokemon(updatedPokemon);
	// 		localStorage.setItem(
	// 			'opponentPokemon',
	// 			JSON.stringify(updatedPokemon)
	// 		);
	// 	}
	// }, [playerSleepCounter, opponentSleepCounter]);

	// // Reset du status freeze avec une chance de 20%
	// useEffect(() => {
	// 	if (
	// 		playerPokemon?.status.name === 'FRZ' &&
	// 		playerThawChance < THAW_CHANCE
	// 	) {
	// 		let updatedPokemon = playerPokemon.changeStatus(new Status('', ''));
	// 		setPlayerPokemon(updatedPokemon);
	// 		localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
	// 	}
	// 	if (
	// 		opponentPokemon?.status.name === 'FRZ' &&
	// 		opponentThawChance < THAW_CHANCE
	// 	) {
	// 		let updatedPokemon = opponentPokemon.changeStatus(new Status('', ''));
	// 		setOpponentPokemon(updatedPokemon);
	// 		localStorage.setItem(
	// 			'opponentPokemon',
	// 			JSON.stringify(updatedPokemon)
	// 		);
	// 	}
	// }, [playerThawChance, opponentThawChance]);

	// // // Reset du status confusion quand le compteur arrive à zéro et 50% chance d'attaquer malgré la confusion
	// useEffect(() => {
	// 	setPlayerPokemon(
	// 		playerPokemon?.updateConfusionCounter(playerConfusionCounter)
	// 	);
	// 	setOpponentPokemon(
	// 		opponentPokemon?.updateConfusionCounter(opponentConfusionCounter)
	// 	);
	// 	setPlayerMoveWhileConfused(false);
	// 	setOpponentMoveWhileConfused(false);
	// 	if (
	// 		playerConfusionCounter === 0 &&
	// 		playerPokemon?.volatileStatus.name === 'CNF'
	// 	) {
	// 		const updatedPlayerPokemon = playerPokemon?.changeVolatileStatus(
	// 			new Status('', '')
	// 		);
	// 		setPlayerPokemon(updatedPlayerPokemon);
	// 		localStorage.setItem(
	// 			'playerPokemon',
	// 			JSON.stringify(updatedPlayerPokemon)
	// 		);
	// 	}
	// 	if (
	// 		opponentConfusionCounter === 0 &&
	// 		opponentPokemon?.volatileStatus.name === 'CNF'
	// 	) {
	// 		const updatedOpponentPokemon = opponentPokemon?.changeVolatileStatus(
	// 			new Status('', '')
	// 		);
	// 		setOpponentPokemon(updatedOpponentPokemon);
	// 		localStorage.setItem(
	// 			'opponentPokemon',
	// 			JSON.stringify(updatedOpponentPokemon)
	// 		);
	// 	}
	// 	if (playerPokemon?.volatileStatus.name === 'CNF') {
	// 		setPlayerMoveWhileConfused(Math.random() >= CONFUSION_MOVE_CHANCE);
	// 	}
	// 	if (opponentPokemon?.volatileStatus.name === 'CNF') {
	// 		setOpponentMoveWhileConfused(Math.random() >= CONFUSION_MOVE_CHANCE);
	// 	}
	// }, [playerConfusionCounter, opponentConfusionCounter]);

	// // 25% de chances d'attaquer sous statut Paralysie
	// useEffect(() => {
	// 	setPlayerMoveWhileParalyzed(false);
	// 	setOpponentMoveWhileParalyzed(false);
	// 	if (
	// 		playerPokemon?.status.name === 'PAR' &&
	// 		playerMoveWhileParalyzedChance > PARALYSIS_MOVE_CHANCE
	// 	) {
	// 		setPlayerMoveWhileParalyzed(true);
	// 	}
	// 	if (
	// 		opponentPokemon?.status.name === 'PAR' &&
	// 		opponentMoveWhileParalyzedChance > PARALYSIS_MOVE_CHANCE
	// 	) {
	// 		setOpponentMoveWhileParalyzed(true);
	// 	}
	// }, [playerMoveWhileParalyzedChance, opponentMoveWhileParalyzedChance]);

	// // Déclenchement des dégâts de poison et/ou de brûlure
	// useEffect(() => {
	// 	if (!poisonDamagesStep && !burnDamagesStep) return;
	// 	if (playerPokemon.status.name === 'PSN' || 'BRN') {
	// 		const updatedPlayerPokemon = playerPokemon.sufferFromStatus();
	// 		setPlayerPokemon(updatedPlayerPokemon);
	// 		localStorage.setItem(
	// 			'playerPokemon',
	// 			JSON.stringify(updatedPlayerPokemon)
	// 		);
	// 	}
	// 	if (opponentPokemon.status.name === 'PSN' || 'BRN') {
	// 		const updatedOpponentPokemon = opponentPokemon.sufferFromStatus();
	// 		setOpponentPokemon(updatedOpponentPokemon);
	// 		localStorage.setItem(
	// 			'opponentPokemon',
	// 			JSON.stringify(updatedOpponentPokemon)
	// 		);
	// 	}
	// 	setPoisonDamagesStep(false);
	// }, [poisonDamagesStep, burnDamagesStep]);

	// Déroulement des attaques une fois les 2 joueurs prêts
	useEffect(() => {
		if (!playerReady || !opponentReady) return;
		handleSleepStatus();
		// handleFreezeStatus();
		// handleConfusionVolatileStatus();
		// handleParalyzisStatus();
		handleAttacksByPriority();
		// handlePoisonAndBurnStatus();
	}, [playerReady, opponentReady]);

	// Détermination du gagnant
	useEffect(() => {
		if (playerPokemon?.status.name === 'KO') {
			setBattleWinner('Opponent wins!');
		}
		if (opponentPokemon?.status.name === 'KO') {
			setBattleWinner('Player wins!');
		}
	}, [playerPokemon, opponentPokemon]);

	// // Affichage du loader
	// if (!battle) {
	// 	return <div>Loading...</div>;
	// }
	// if (!playerPokemon) {
	// 	return <div>Loading2...</div>;
	// }
	// if (!opponentPokemon) {
	// 	return <div>Loading3...</div>;
	// }

	const handleSleepStatus = () => {
		let playerUpdatedStatus: Status = playerPokemon.status;
		let opponentUpdatedStatus: Status = opponentPokemon.status;
		let updatedPlayerPokemon: Pokemon = playerPokemon;
		let updatedOpponentPokemon: Pokemon = opponentPokemon;
		if (
			playerPokemon.status.name === 'SLP' &&
			playerPokemon.status.counter !== 0
		) {
			playerUpdatedStatus = playerPokemon.status.setCounter(
				playerPokemon.status.counter - 1
			);
		} else if (
			playerPokemon.status.name === 'SLP' &&
			playerPokemon.status.counter === 0
		) {
			playerUpdatedStatus = new Status('', '', 0, true);
		}
		if (
			opponentPokemon.status.name === 'SLP' &&
			opponentPokemon.status.counter !== 0
		) {
			opponentUpdatedStatus = opponentPokemon.status.setCounter(
				opponentPokemon.status.counter - 1
			);
		} else if (
			opponentPokemon.status.name === 'SLP' &&
			opponentPokemon.status.counter === 0
		) {
			opponentUpdatedStatus = new Status('', '', 0, true);
		}
		updatedPlayerPokemon = playerPokemon.changeStatus(playerUpdatedStatus);
		updatedOpponentPokemon = opponentPokemon.changeStatus(
			opponentUpdatedStatus
		);
		setPlayerPokemon(updatedPlayerPokemon);
		setOpponentPokemon(updatedOpponentPokemon);
		localStorage.setItem(
			'playerPokemon',
			JSON.stringify(updatedPlayerPokemon)
		);
		localStorage.setItem(
			'opponentPokemon',
			JSON.stringify(updatedOpponentPokemon)
		);
		console.log(localStorage);
	};

	// const handleFreezeStatus = () => {
	// 	if (playerPokemon.status.name === 'FRZ') {
	// 		setPlayerThawChance(Math.random());
	// 	}
	// 	if (opponentPokemon.status.name === 'FRZ') {
	// 		setOpponentThawChance(Math.random());
	// 	}
	// };

	// const handleConfusionVolatileStatus = () => {
	// 	if (playerPokemon.volatileStatus.name === 'CNF') {
	// 		setPlayerConfusionCounter(
	// 			playerConfusionCounter != 0
	// 				? playerConfusionCounter - 1
	// 				: Math.ceil(Math.random() * MAX_TURNS_CONFUSED)
	// 		);
	// 	}
	// 	if (opponentPokemon.volatileStatus.name === 'CNF') {
	// 		setOpponentConfusionCounter(
	// 			opponentConfusionCounter != 0
	// 				? opponentConfusionCounter - 1
	// 				: Math.ceil(Math.random() * MAX_TURNS_CONFUSED)
	// 		);
	// 	}
	// };

	// const handleParalyzisStatus = () => {
	// 	if (playerPokemon.status.name === 'PAR') {
	// 		setPlayerMoveWhileParalyzedChance(Math.random());
	// 	}
	// 	if (opponentPokemon.status.name === 'PAR') {
	// 		setOpponentMoveWhileParalyzedChance(Math.random());
	// 	}
	// };

	const handleAttacksByPriority = () => {
		let playerUpdatedPokemon: Pokemon = JSON.parse(
			localStorage.getItem('playerPokemon')
		);
		let opponentUpdatedPokemon: Pokemon = JSON.parse(
			localStorage.getItem('opponentPokemon')
		);
		if (
			playerUpdatedPokemon.getStat('speed').value >
			opponentUpdatedPokemon.getStat('speed').value
		) {
			handlePlayerAttack();
			if (opponentUpdatedPokemon.status.name !== 'KO') {
				handleOpponentAttack();
			}
		} else if (
			playerPokemon.getStat('speed').value <
			opponentPokemon.getStat('speed').value
		) {
			const updatedPlayer = handleOpponentAttack();
			if (updatedPlayer.status.name !== 'KO') {
				handlePlayerAttack();
			}
		} else {
			const random = Math.random();
			if (random < 0.5) {
				const updatedOpponent = handlePlayerAttack();
				if (updatedOpponent.status.name !== 'KO') {
					handleOpponentAttack();
				}
			} else {
				const updatedPlayer = handleOpponentAttack();
				if (updatedPlayer.status.name !== 'KO') {
					handlePlayerAttack();
				}
			}
		}
		setPlayerReady(false);
		setOpponentReady(false);
	};

	// Gestion du move du joueur
	const handlePlayerAttack = () => {
		if (!playerPokemon.status.ableToMove) return opponentPokemon;
		let target: Pokemon;
		// if (
		// 	playerPokemon.volatileStatus.name === 'CNF' &&
		// 	!playerMoveWhileConfused
		// ) {
		// 	setPlayerSelectedMove(CONFUSION_MOVE);
		// }
		if (playerSelectedMove.target === 'user') {
			target = playerPokemon;
		} else {
			target = opponentPokemon;
		}
		const updatedTargetPokemon = playerPokemon.attack(
			target,
			playerSelectedMove
		);
		setOpponentPokemon(updatedTargetPokemon);
		if (playerSelectedMove.target === 'user') {
			localStorage.setItem(
				'playerPokemon',
				JSON.stringify(updatedTargetPokemon)
			);
		} else {
			localStorage.setItem(
				'opponentPokemon',
				JSON.stringify(updatedTargetPokemon)
			);
		}
		return updatedTargetPokemon;
	};

	// Gestion du move de l'adversaire
	const handleOpponentAttack = () => {
		// if (
		// 	(opponentPokemon.status.name === 'PAR' &&
		// 		!opponentMoveWhileParalyzed) ||
		// 	(opponentPokemon.volatileStatus.name === 'CNF' &&
		// 		!opponentMoveWhileConfused)
		// )
		// 	return playerPokemon;
		const updatedPlayerPokemon = opponentPokemon.attack(
			playerPokemon,
			opponentSelectedMove
		);
		setPlayerPokemon(updatedPlayerPokemon);
		localStorage.setItem(
			'playerPokemon',
			JSON.stringify(updatedPlayerPokemon)
		);
		return updatedPlayerPokemon;
	};

	const handlePlayerReady = () => {
		setPlayerReady(true);
	};

	const handleOpponentReady = () => {
		setOpponentReady(true);
	};

	// const handlePoisonAndBurnStatus = () => {
	// 	if (
	// 		['PSN', 'BRN'].includes(playerPokemon.status.name) ||
	// 		['PSN', 'BRN'].includes(opponentPokemon.status.name)
	// 	) {
	// 		setPoisonDamagesStep(true);
	// 		setBurnDamagesStep(true);
	// 	}
	// };

	return (
		<div style={{ margin: '100px 0 0 10px' }}>
			{/* Affichage des informations du Pokemon de l'adversaire */}
			<p>
				{opponentPokemon?.name + ' '}
				{opponentPokemon?.getStat('hp').value +
					'/' +
					opponentPokemon?.getStat('hp').max}
				<br />
				{'status ' + opponentPokemon?.status.name
					? opponentPokemon?.status.name
					: ''}
				{'volatileStatus' + opponentPokemon?.volatileStatus.name
					? opponentPokemon?.volatileStatus.name
					: ''}
			</p>

			{/* Bouton Attack de l'adversaire */}
			<button
				onClick={() => {
					setOpponentMovesShowed(!opponentMovesShowed);
				}}
			>
				Attack
			</button>

			{/* Affichage des moves de l'adversaire */}
			{opponentMovesShowed && (
				<div>
					{opponentPokemon.moves.map((move: Move) => (
						<button
							key={move.name}
							onClick={() => {
								setOpponentSelectedMove(move);
								handleOpponentReady();
							}}
						>
							{move.name}
						</button>
					))}
				</div>
			)}

			{/* Affichage des informations du Pokemon du joueur */}
			<p>
				{playerPokemon?.name + ' '}
				{playerPokemon?.getStat('hp').value +
					'/' +
					playerPokemon?.getStat('hp').max}
				<br />
				{'status ' + playerPokemon?.status.name
					? playerPokemon?.status.name
					: ''}
				{'volatileStatus' + playerPokemon?.volatileStatus.name
					? playerPokemon?.volatileStatus.name
					: ''}
			</p>

			{/* Bouton Attack du joueur */}
			<button
				onClick={() => {
					setPlayerMovesShowed(!playerMovesShowed);
				}}
			>
				Attack
			</button>

			{/* Affichage des moves du joueur */}
			{playerMovesShowed && (
				<div>
					{playerPokemon.moves.map((move: Move) => (
						<button
							key={move.name}
							onClick={() => {
								setPlayerSelectedMove(move);
								handlePlayerReady();
							}}
						>
							{move.name}
						</button>
					))}
				</div>
			)}

			{/* Affichage du vainqueur */}
			{battleWinner && <h1>{battleWinner}</h1>}
		</div>
	);
};
export default Battle;
