'use client';

import { useEffect, useState } from 'react';

// Classes
import Pokemon from '../../../back/classes/pokemon';
import BattleClass from '../../../back/classes/battle';
import Move from '../../../back/classes/move';
import Status from '../../../back/classes/status';
import { THAW_CHANCE, PARALYSIS_CHANCE, CONFUSED_MOVE } from './constants';

// Interfaces
interface BattleProps {
	battle: BattleClass;
}

const Battle = ({ battle }: BattleProps) => {
	// States
	const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>();
	const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>();
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [opponentReady, setOpponentReady] = useState<boolean>(false);
	const [battleWinner, setBattleWinner] = useState<string>('');
	const [playerMovesShowed, setPlayerMovesShowed] = useState<boolean>(false);
	const [opponentMovesShowed, setOpponentMovesShowed] =
		useState<boolean>(false);

	// Utilitaires
	function storePlayerPokemon(updatedPokemon: Pokemon) {
		setPlayerPokemon(updatedPokemon);
		localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
	}
	function storeOpponentPokemon(updatedPokemon: Pokemon) {
		setOpponentPokemon(updatedPokemon);
		localStorage.setItem('opponentPokemon', JSON.stringify(updatedPokemon));
	}
	function recreatePokemonFromParsed(parsedPokemon: any) {
		const status = parsedPokemon.status
			? new Status(
					parsedPokemon.status.name,
					parsedPokemon.status.description,
					parsedPokemon.status.counter,
					parsedPokemon.status.ableToMove
				)
			: new Status('', '', 0, true);

		const volatileStatus = parsedPokemon.volatileStatus
			? new Status(
					parsedPokemon.volatileStatus.name,
					parsedPokemon.volatileStatus.description,
					parsedPokemon.volatileStatus.counter,
					parsedPokemon.volatileStatus.ableToMove
				)
			: new Status('', '', 0, true);

		return new Pokemon(
			parsedPokemon.name,
			parsedPokemon.stats,
			parsedPokemon.moves,
			parsedPokemon.activeMove,
			status,
			volatileStatus
		);
	}
	function getPlayerFromStore() {
		const parsedPlayerPokemon = JSON.parse(
			localStorage.getItem('playerPokemon')
		);
		const playerPokemon = recreatePokemonFromParsed(parsedPlayerPokemon);
		return playerPokemon;
	}
	function getOpponentFromStore() {
		const parsedOpponentPokemon = JSON.parse(
			localStorage.getItem('opponentPokemon')
		);
		const opponentPokemon = recreatePokemonFromParsed(parsedOpponentPokemon);
		return opponentPokemon;
	}

	// Récupération des pokémons depuis le localStorage ou la room
	useEffect(() => {
		if (!battle) return;
		if (
			localStorage.getItem('playerPokemon') &&
			localStorage.getItem('opponentPokemon')
		) {
			setPlayerPokemon(getPlayerFromStore());
			setOpponentPokemon(getOpponentFromStore());
		} else {
			setPlayerPokemon(battle.playerPokemon);
			setOpponentPokemon(battle.opponentPokemon);
		}
	}, [battle]);

	//

	// Déroulement des attaques une fois les 2 joueurs prêts
	useEffect(() => {
		if (!playerReady || !opponentReady) return;
		handleSleeping();
		handleConfusion();
		handleParalysis();
		handleAttacksByPriority();
		handleFreezing();
		handlePoisoning();
		handleBurning();
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

	const handleSleeping = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (playerUpdatedPokemon.status.name === 'SLP') {
			let updatedStatus = playerUpdatedPokemon.status.setCounter(
				playerUpdatedPokemon.status.counter - 1
			);
			if (updatedStatus.counter === 0) {
				updatedStatus = new Status('', '', 0, true);
			}
			const updatedPokemon =
				playerUpdatedPokemon.changeStatus(updatedStatus);
			storePlayerPokemon(updatedPokemon);
		}

		if (opponentUpdatedPokemon.status.name === 'SLP') {
			let updatedStatus = opponentUpdatedPokemon.status.setCounter(
				opponentUpdatedPokemon.status.counter - 1
			);
			if (updatedStatus.counter === 0) {
				updatedStatus = new Status('', '', 0, true);
			}
			const updatedPokemon =
				opponentUpdatedPokemon.changeStatus(updatedStatus);
			storeOpponentPokemon(updatedPokemon);
		}
	};

	const handleConfusion = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (playerUpdatedPokemon.volatileStatus.name === 'CNF') {
			const random = Math.random();
			if (random < 0.5) {
				playerUpdatedPokemon =
					playerUpdatedPokemon.changeActiveMove(CONFUSED_MOVE);
				storePlayerPokemon(playerUpdatedPokemon);
			}
		}

		if (opponentUpdatedPokemon.volatileStatus.name === 'CNF') {
			const random = Math.random();
			if (random < 0.5) {
				opponentUpdatedPokemon =
					opponentUpdatedPokemon.changeActiveMove(CONFUSED_MOVE);
				storeOpponentPokemon(opponentUpdatedPokemon);
			}
		}
	};

	const handleParalysis = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (playerUpdatedPokemon.status.name === 'PAR') {
			let updatedStatus = playerUpdatedPokemon.status.setAbleToMove(false);
			const random = Math.random();
			if (random < PARALYSIS_CHANCE) {
				updatedStatus = updatedStatus.setAbleToMove(true);
			}
			playerUpdatedPokemon =
				playerUpdatedPokemon.changeStatus(updatedStatus);
			storePlayerPokemon(playerUpdatedPokemon);
		}

		if (opponentUpdatedPokemon.status.name === 'PAR') {
			let updatedStatus = opponentUpdatedPokemon.status.setAbleToMove(false);
			const random = Math.random();
			if (random < PARALYSIS_CHANCE) {
				updatedStatus = updatedStatus.setAbleToMove(true);
			}
			opponentUpdatedPokemon =
				opponentUpdatedPokemon.changeStatus(updatedStatus);
			storeOpponentPokemon(opponentUpdatedPokemon);
		}
	};

	const handleAttacksByPriority = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();
		const playerSpeed = playerUpdatedPokemon?.getStat('speed').value;
		const opponentSpeed = opponentUpdatedPokemon?.getStat('speed').value;

		if (playerSpeed > opponentSpeed) {
			handlePlayerAttack();
			handleOpponentAttack();
		} else if (playerSpeed < opponentSpeed) {
			handleOpponentAttack();
			handlePlayerAttack();
		} else {
			const random = Math.random();
			if (random < 0.5) {
				handlePlayerAttack();
				handleOpponentAttack();
			} else {
				handleOpponentAttack();
				handlePlayerAttack();
			}
		}
		setPlayerReady(false);
		setOpponentReady(false);
	};

	const handleFreezing = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (playerUpdatedPokemon.status.name === 'FRZ') {
			const random = Math.random();
			if (random < THAW_CHANCE) {
				const updatedStatus = new Status('', '', 0, true);
				playerUpdatedPokemon =
					playerUpdatedPokemon.changeStatus(updatedStatus);
				storePlayerPokemon(playerUpdatedPokemon);
			}
		}

		if (opponentUpdatedPokemon.status.name === 'FRZ') {
			const random = Math.random();
			if (random < THAW_CHANCE) {
				const updatedStatus = new Status('', '', 0, true);
				opponentUpdatedPokemon =
					opponentUpdatedPokemon.changeStatus(updatedStatus);
				storeOpponentPokemon(opponentUpdatedPokemon);
			}
		}
	};

	const handlePoisoning = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (playerUpdatedPokemon.status.name === 'PSN') {
			const updatedPokemon = playerUpdatedPokemon.sufferFromStatus();
			storePlayerPokemon(updatedPokemon);
		}

		if (opponentUpdatedPokemon.status.name === 'PSN') {
			const updatedPokemon = opponentUpdatedPokemon.sufferFromStatus();
			storeOpponentPokemon(updatedPokemon);
		}
	};

	const handleBurning = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (playerUpdatedPokemon.status.name === 'BRN') {
			const updatedPokemon = playerUpdatedPokemon.sufferFromStatus();
			storePlayerPokemon(updatedPokemon);
		}

		if (opponentUpdatedPokemon.status.name === 'BRN') {
			const updatedPokemon = opponentUpdatedPokemon.sufferFromStatus();
			storeOpponentPokemon(updatedPokemon);
		}
	};

	const handlePlayerMoveSelection = (move: Move) => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		playerUpdatedPokemon = playerUpdatedPokemon.changeActiveMove(move);
		storePlayerPokemon(playerUpdatedPokemon);
	};

	const handleOpponentMoveSelection = (move: Move) => {
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();
		opponentUpdatedPokemon = opponentUpdatedPokemon.changeActiveMove(move);
		storeOpponentPokemon(opponentUpdatedPokemon);
	};

	const handlePlayerAttack = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (!playerUpdatedPokemon.status.ableToMove) return;

		if (playerUpdatedPokemon.activeMove.target === 'user') {
			const updatedPokemon =
				playerUpdatedPokemon.attack(playerUpdatedPokemon);
			storePlayerPokemon(updatedPokemon);
		} else {
			const updatedPokemon = playerUpdatedPokemon.attack(
				opponentUpdatedPokemon
			);
			storeOpponentPokemon(updatedPokemon);
		}
	};

	const handleOpponentAttack = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (!opponentUpdatedPokemon.status.ableToMove) return;

		if (opponentUpdatedPokemon.activeMove.target === 'user') {
			const updatedPokemon = opponentUpdatedPokemon.attack(
				opponentUpdatedPokemon
			);
			storeOpponentPokemon(updatedPokemon);
		} else {
			const updatedPokemon =
				opponentUpdatedPokemon.attack(playerUpdatedPokemon);
			storePlayerPokemon(updatedPokemon);
		}
	};

	const handlePlayerReady = () => {
		setPlayerReady(true);
	};

	const handleOpponentReady = () => {
		setOpponentReady(true);
	};

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
								handleOpponentMoveSelection(move);
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
								handlePlayerMoveSelection(move);
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
