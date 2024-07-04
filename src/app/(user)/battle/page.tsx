'use client';

import { useEffect, useState } from 'react';

// Classes
import Pokemon from '../../../back/classes/pokemon';
import BattleClass from '../../../back/classes/battle';
import Move from '../../../back/classes/move';
import Status from '../../../back/classes/status';

// Interfaces
interface BattleProps {
	battle: BattleClass;
}

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
		return new Pokemon(
			parsedPokemon.name,
			parsedPokemon.stats,
			parsedPokemon.moves,
			parsedPokemon.status,
			parsedPokemon.volatileStatus
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

	// Déroulement des attaques une fois les 2 joueurs prêts
	useEffect(() => {
		if (!playerReady || !opponentReady) return;
		handleAttacksByPriority();
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

	// Gestion du move du joueur
	const handlePlayerAttack = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (!playerUpdatedPokemon.status.ableToMove) return;

		if (playerSelectedMove.target === 'user') {
			const updatedPokemon = playerUpdatedPokemon.attack(
				playerUpdatedPokemon,
				playerSelectedMove
			);
			storePlayerPokemon(updatedPokemon);
		} else {
			const updatedPokemon = playerUpdatedPokemon.attack(
				opponentUpdatedPokemon,
				playerSelectedMove
			);
			storeOpponentPokemon(updatedPokemon);
		}
	};

	// Gestion du move de l'adversaire
	const handleOpponentAttack = () => {
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();

		if (!opponentUpdatedPokemon.status.ableToMove) return;

		if (opponentSelectedMove.target === 'user') {
			const updatedPokemon = opponentUpdatedPokemon.attack(
				opponentUpdatedPokemon,
				opponentSelectedMove
			);
			storeOpponentPokemon(updatedPokemon);
		} else {
			const updatedPokemon = opponentUpdatedPokemon.attack(
				playerUpdatedPokemon,
				opponentSelectedMove
			);
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
