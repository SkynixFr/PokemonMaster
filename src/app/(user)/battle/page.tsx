'use client';

import { use, useEffect, useState } from 'react';

// Classes
import PokemonClass from '../../../back/classes/pokemon';
import BattleClass from '../../../back/classes/battle';
import Move from '../../../back/classes/move';
import Status from '../../../back/classes/status';

// Interfaces
interface BattleProps {
	battle: BattleClass;
}

// Constants
const MAX_TURNS_ASLEEP = 3;
const THAW_CHANCE = 0.2;
const PARALYSIS_MOVE_CHANCE = 0.25;

const Battle = ({ battle }: BattleProps) => {
	const [playerPokemon, setPlayerPokemon] = useState<PokemonClass | null>();
	const [opponentPokemon, setOpponentPokemon] =
		useState<PokemonClass | null>();
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [opponentReady, setOpponentReady] = useState<boolean>(false);
	const [playerSelectedMove, setPlayerSelectedMove] = useState<Move>();
	const [opponentSelectedMove, setOpponentSelectedMove] = useState<Move>();
	const [battleWinner, setBattleWinner] = useState<string>('');
	const [playerMovesShowed, setPlayerMovesShowed] = useState<boolean>(false);
	const [opponentMovesShowed, setOpponentMovesShowed] =
		useState<boolean>(false);
	const [playerSleepCounter, setPlayerSleepCounter] = useState<number>(0);
	const [opponentSleepCounter, setOpponentSleepCounter] = useState<number>(0);
	const [playerThawChance, setPlayerThawChance] = useState<number>(0);
	const [opponentThawChance, setOpponentThawChance] = useState<number>(0);
	const [poisonDamagesStep, setPoisonDamagesStep] = useState<boolean>(false);
	const [burnDamagesStep, setBurnDamagesStep] = useState<boolean>(false);
	const [playerMoveWhileParalyzedChance, setPlayerMoveWhileParalyzedChance] =
		useState<number>(0);
	const [
		opponentMoveWhileParalyzedChance,
		setOpponentMoveWhileParalyzedChance
	] = useState<number>(0);
	const [playerMoveWhileParalyzed, setPlayerMoveWhileParalyzed] =
		useState<boolean>(false);
	const [opponentMoveWhileParalyzed, setOpponentMoveWhileParalyzed] =
		useState<boolean>(false);

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
				new PokemonClass(
					parsedPlayerPokemon.name,
					parsedPlayerPokemon.stats,
					parsedPlayerPokemon.moves,
					parsedPlayerPokemon.status
				)
			);
			setOpponentPokemon(
				new PokemonClass(
					parsedOpponentPokemon.name,
					parsedOpponentPokemon.stats,
					parsedOpponentPokemon.moves,
					parsedOpponentPokemon.status
				)
			);
		} else {
			setPlayerPokemon(battle.playerPokemon);
			setOpponentPokemon(battle.opponentPokemon);
		}
	}, [battle]);

	// Reset du status sleep quand le compteur arrive à zéro
	useEffect(() => {
		setPlayerPokemon(playerPokemon?.updateStatusCounter(playerSleepCounter));
		setOpponentPokemon(
			opponentPokemon?.updateStatusCounter(opponentSleepCounter)
		);
		if (playerSleepCounter === 0 && playerPokemon?.status.name === 'SLP') {
			let updatedPokemon = playerPokemon?.changeStatus(new Status('', ''));
			setPlayerPokemon(updatedPokemon);
			localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
		}
		if (
			opponentSleepCounter === 0 &&
			opponentPokemon?.status.name === 'SLP'
		) {
			let updatedPokemon = opponentPokemon?.changeStatus(new Status('', ''));
			setOpponentPokemon(updatedPokemon);
			localStorage.setItem(
				'opponentPokemon',
				JSON.stringify(updatedPokemon)
			);
		}
	}, [playerSleepCounter, opponentSleepCounter]);

	// Reset du status freeze avec une chance de 20%
	useEffect(() => {
		if (
			playerPokemon?.status.name === 'FRZ' &&
			playerThawChance < THAW_CHANCE
		) {
			let updatedPokemon = playerPokemon.changeStatus(new Status('', ''));
			setPlayerPokemon(updatedPokemon);
			localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
		}
		if (
			opponentPokemon?.status.name === 'FRZ' &&
			opponentThawChance < THAW_CHANCE
		) {
			let updatedPokemon = opponentPokemon.changeStatus(new Status('', ''));
			setOpponentPokemon(updatedPokemon);
			localStorage.setItem(
				'opponentPokemon',
				JSON.stringify(updatedPokemon)
			);
		}
	}, [playerThawChance, opponentThawChance]);

	// 25% de chances d'attaquer sous statut Paralysie
	useEffect(() => {
		setPlayerMoveWhileParalyzed(false);
		setOpponentMoveWhileParalyzed(false);
		if (
			playerPokemon?.status.name === 'PAR' &&
			playerMoveWhileParalyzedChance > PARALYSIS_MOVE_CHANCE
		) {
			setPlayerMoveWhileParalyzed(true);
		}
		if (
			opponentPokemon?.status.name === 'PAR' &&
			opponentMoveWhileParalyzedChance > PARALYSIS_MOVE_CHANCE
		) {
			setOpponentMoveWhileParalyzed(true);
		}
	}, [playerMoveWhileParalyzedChance, opponentMoveWhileParalyzedChance]);

	// Déclenchement des dégâts de poison et/ou de brûlure
	useEffect(() => {
		if (!poisonDamagesStep && !burnDamagesStep) return;
		if (playerPokemon.status.name === 'PSN' || 'BRN') {
			const updatedPlayerPokemon = playerPokemon.sufferFromStatus();
			setPlayerPokemon(updatedPlayerPokemon);
			localStorage.setItem(
				'playerPokemon',
				JSON.stringify(updatedPlayerPokemon)
			);
		}
		if (opponentPokemon.status.name === 'PSN' || 'BRN') {
			const updatedOpponentPokemon = opponentPokemon.sufferFromStatus();
			setOpponentPokemon(updatedOpponentPokemon);
			localStorage.setItem(
				'opponentPokemon',
				JSON.stringify(updatedOpponentPokemon)
			);
		}
		setPoisonDamagesStep(false);
	}, [poisonDamagesStep, burnDamagesStep]);

	// Déroulement des attaques une fois les 2 joueurs prêts
	useEffect(() => {
		if (!playerReady || !opponentReady) return;
		handleSleepStatus();
		handleFreezeStatus();
		handleParalyzisStatus();
		handleAttacksByPriority();
		handlePoisonAndBurnStatus();
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

	// Affichage du loader
	if (!battle) {
		return <div>Loading...</div>;
	}
	if (!playerPokemon) {
		return <div>Loading2...</div>;
	}
	if (!opponentPokemon) {
		return <div>Loading3...</div>;
	}

	const handleSleepStatus = () => {
		if (playerPokemon.status.name === 'SLP') {
			setPlayerSleepCounter(
				playerSleepCounter !== 0
					? playerSleepCounter - 1
					: Math.ceil(Math.random() * MAX_TURNS_ASLEEP)
			);
		}
		if (opponentPokemon.status.name === 'SLP') {
			setOpponentSleepCounter(
				opponentSleepCounter !== 0
					? opponentSleepCounter - 1
					: Math.ceil(Math.random() * MAX_TURNS_ASLEEP)
			);
		}
	};

	const handleFreezeStatus = () => {
		if (playerPokemon.status.name === 'FRZ') {
			setPlayerThawChance(Math.random());
		}
		if (opponentPokemon.status.name === 'FRZ') {
			setOpponentThawChance(Math.random());
		}
	};

	const handleParalyzisStatus = () => {
		if (playerPokemon.status.name === 'PAR') {
			setPlayerMoveWhileParalyzedChance(Math.random());
		}
		if (opponentPokemon.status.name === 'PAR') {
			setOpponentMoveWhileParalyzedChance(Math.random());
		}
	};

	const handleAttacksByPriority = () => {
		if (
			playerPokemon.getStat('speed').value >
			opponentPokemon.getStat('speed').value
		) {
			const updatedOpponent = handlePlayerAttack();
			if (updatedOpponent.status.name !== 'KO') {
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
		if (playerPokemon.status.name === 'PAR' && !playerMoveWhileParalyzed)
			return opponentPokemon;
		const updatedOpponentPokemon = playerPokemon.attack(
			opponentPokemon,
			playerSelectedMove
		);
		setOpponentPokemon(updatedOpponentPokemon);
		localStorage.setItem(
			'opponentPokemon',
			JSON.stringify(updatedOpponentPokemon)
		);
		return updatedOpponentPokemon;
	};

	// Gestion du move de l'adversaire
	const handleOpponentAttack = () => {
		if (opponentPokemon.status.name === 'PAR' && !opponentMoveWhileParalyzed)
			return playerPokemon;
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

	const handlePoisonAndBurnStatus = () => {
		if (
			['PSN', 'BRN'].includes(playerPokemon.status.name) ||
			['PSN', 'BRN'].includes(opponentPokemon.status.name)
		) {
			setPoisonDamagesStep(true);
			setBurnDamagesStep(true);
		}
	};

	return (
		<div style={{ margin: '100px 0 0 10px' }}>
			{/* Affichage des informations du Pokemon de l'adversaire */}
			<p>
				{opponentPokemon.name + ' '}
				{opponentPokemon.getStat('hp').value +
					'/' +
					opponentPokemon.getStat('hp').max}
				<br />
				{'status ' + opponentPokemon.status.name
					? opponentPokemon.status.name
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
				{playerPokemon.name + ' '}
				{playerPokemon.getStat('hp').value +
					'/' +
					playerPokemon.getStat('hp').max}
				<br />
				{'status ' + playerPokemon.status.name
					? playerPokemon.status.name
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
