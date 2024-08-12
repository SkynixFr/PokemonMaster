'use client';

import { useEffect, useState } from 'react';

// Classes
import Pokemon from '../../../back/classes/pokemon';
import BattleClass from '../../../back/classes/battle';
import Move from '../../../back/classes/move';
import Status from '../../../back/classes/status';
import { THAW_CHANCE, PARALYSIS_CHANCE, CONFUSED_MOVE } from './constants';
import { set } from 'zod';

// Interfaces
interface BattleProps {
	battle: BattleClass;
}

const Battle = ({ battle }: BattleProps) => {
	// States
	const [playerTeam, setPlayerTeam] = useState<Pokemon[]>([]);
	const [opponentTeam, setOpponentTeam] = useState<Pokemon[]>([]);
	const [playerTeamShowed, setPlayerTeamShowed] = useState<boolean>(false);
	const [opponentTeamShowed, setOpponentTeamShowed] = useState<boolean>(false);
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
		updateTeamWithNewPokemon(updatedPokemon, setPlayerTeam);
		localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
	}
	function storeOpponentPokemon(updatedPokemon: Pokemon) {
		setOpponentPokemon(updatedPokemon);
		updateTeamWithNewPokemon(updatedPokemon, setOpponentTeam);
		localStorage.setItem('opponentPokemon', JSON.stringify(updatedPokemon));
	}
	function updateTeamWithNewPokemon(
		updatedPokemon: Pokemon,
		setTeam: Function
	) {
		setTeam((team: Pokemon[]) =>
			team.map(pokemon =>
				pokemon.name === updatedPokemon.name ? updatedPokemon : pokemon
			)
		);
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

		const moves = parsedPokemon.moves.map((move: Move) => {
			return new Move(
				move.name,
				move.power,
				move.accuracy,
				move.pp,
				move.meta,
				move.target,
				move.type
			);
		});

		const activeMove = parsedPokemon.activeMove
			? new Move(
					parsedPokemon.activeMove.name,
					parsedPokemon.activeMove.power,
					parsedPokemon.activeMove.accuracy,
					parsedPokemon.activeMove.pp,
					parsedPokemon.activeMove.meta,
					parsedPokemon.activeMove.target,
					parsedPokemon.activeMove.type
				)
			: moves[0];

		return new Pokemon(
			parsedPokemon.name,
			parsedPokemon.stats,
			moves,
			activeMove,
			status,
			volatileStatus,
			parsedPokemon.types
		);
	}
	function getPlayerFromStore() {
		const parsedPlayerPokemon = JSON.parse(
			localStorage.getItem('playerPokemon')
		);
		const playerPokemon = recreatePokemonFromParsed(parsedPlayerPokemon);
		return playerPokemon;
	}
	function getPlayerTeamFromStore() {
		const parsedPlayerTeam = JSON.parse(localStorage.getItem('playerTeam'));
		const playerTeam = parsedPlayerTeam.map((parsedPokemon: Pokemon) => {
			return recreatePokemonFromParsed(parsedPokemon);
		});
		return playerTeam;
	}
	function getOpponentFromStore() {
		const parsedOpponentPokemon = JSON.parse(
			localStorage.getItem('opponentPokemon')
		);
		const opponentPokemon = recreatePokemonFromParsed(parsedOpponentPokemon);
		return opponentPokemon;
	}
	function getOpponentTeamFromStore() {
		const parsedOpponentTeam = JSON.parse(
			localStorage.getItem('opponentTeam')
		);
		const opponentTeam = parsedOpponentTeam.map((parsedPokemon: Pokemon) => {
			return recreatePokemonFromParsed(parsedPokemon);
		});
		return opponentTeam;
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
		if (
			localStorage.getItem('playerTeam') &&
			localStorage.getItem('opponentTeam')
		) {
			setPlayerTeam(getPlayerTeamFromStore());
			setOpponentTeam(getOpponentTeamFromStore());
		} else {
			setPlayerTeam([battle.playerPokemon]);
			setOpponentTeam([battle.opponentPokemon]);
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
		handleActiveMovesPpReduction();
		handleThawing();
		handlePoisoning();
		handleBurning();
		setPlayerReady(false);
		setOpponentReady(false);
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

	const handleActiveMovesPpReduction = () => {
		let updatedPlayerPokemon: Pokemon = getPlayerFromStore();
		let updatedOpponentPokemon: Pokemon = getOpponentFromStore();
		let updatedPlayerMoves: Move[] = updatedPlayerPokemon.moves;
		let updatedOpponentMoves: Move[] = updatedOpponentPokemon.moves;
		updatedPlayerMoves = updatedPlayerMoves.map((move: Move) =>
			move.name === updatedPlayerPokemon.activeMove.name
				? move.decreasePP()
				: move
		);
		updatedOpponentMoves = updatedOpponentMoves.map((move: Move) =>
			move.name === updatedOpponentPokemon.activeMove.name
				? move.decreasePP()
				: move
		);
		updatedPlayerPokemon =
			updatedPlayerPokemon.updateMoves(updatedPlayerMoves);
		updatedOpponentPokemon =
			updatedOpponentPokemon.updateMoves(updatedOpponentMoves);
		storePlayerPokemon(updatedPlayerPokemon);
		storeOpponentPokemon(updatedOpponentPokemon);
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
		if (move.pp === 0) return;
		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
		playerUpdatedPokemon = playerUpdatedPokemon.changeActiveMove(move);
		storePlayerPokemon(playerUpdatedPokemon);
		handlePlayerReady();
	};

	const handleOpponentMoveSelection = (move: Move) => {
		if (move.pp === 0) return;
		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();
		opponentUpdatedPokemon = opponentUpdatedPokemon.changeActiveMove(move);
		storeOpponentPokemon(opponentUpdatedPokemon);
		handleOpponentReady();
	};

	const handlePlayerPokemonSelection = (pokemon: Pokemon) => {
		setPlayerPokemon(pokemon);
		storePlayerPokemon(pokemon);
	};

	// Sélection du Pokémon de l'adversaire
	const handleOpponentPokemonSelection = (pokemon: Pokemon) => {
		setOpponentPokemon(pokemon);
		storeOpponentPokemon(pokemon);
	};

	const handleThawing = () => {
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
				<br />
				{'volatileStatus' + opponentPokemon?.volatileStatus.name
					? opponentPokemon?.volatileStatus.name
					: ''}
			</p>

			{/* Bouton Team de l'adversaire */}
			<button
				onClick={() => {
					setOpponentTeamShowed(!opponentTeamShowed);
				}}
			>
				Team
			</button>

			{/* Affichage des Pokémons de l'adversaire */}
			{opponentTeamShowed && (
				<div>
					{opponentTeam.map((pokemon: Pokemon) => (
						<button
							key={pokemon.name}
							onClick={() => {
								handleOpponentPokemonSelection(pokemon);
							}}
						>
							{pokemon.name}
						</button>
					))}
				</div>
			)}

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
				<br />
				{'volatileStatus' + playerPokemon?.volatileStatus.name
					? playerPokemon?.volatileStatus.name
					: ''}
			</p>

			{/* Bouton Team du joueur */}
			<button
				onClick={() => {
					setPlayerTeamShowed(!playerTeamShowed);
				}}
			>
				Team
			</button>

			{/* Affichage des Pokémons du joueur */}
			{playerTeamShowed && (
				<div>
					{playerTeam.map((pokemon: Pokemon) => (
						<button
							key={pokemon.name}
							onClick={() => {
								handlePlayerPokemonSelection(pokemon);
							}}
						>
							{pokemon.name}
						</button>
					))}
				</div>
			)}

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
