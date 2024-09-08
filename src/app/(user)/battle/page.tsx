'use client';

import React, { useEffect, useState } from 'react';

// Components
import CustomImage from '../../../front/components/customImage';
import BattleTeamCard from '../../../front/components/battle/battleTeamCard';
import BattlePokemonCard from '../../../front/components/battle/battlePokemonCard';

//Icons
import { Moon, Sun } from 'lucide-react';

// Classes
import Team from '../../../back/classes/team';
import Pokemon from '../../../back/classes/pokemon';
import BattleClass from '../../../back/classes/battle';
import Move from '../../../back/classes/move';
import Status from '../../../back/classes/status';

// Interfaces
interface BattleProps {
	battle: BattleClass;
}

// Utils
import BattleActions from '../../../front/components/battle/battleActions';
import {
	PARALYSIS_CHANCE,
	THAW_CHANCE
} from '../../../front/utils/battle/constants';

const Battle = ({ battle }: BattleProps) => {
	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	const [activeTheme, setActiveTheme] = useState<string>('day');
	const [activeTurn, setActiveTurn] = useState<number>(null);
	const [playerTeam, setPlayerTeam] = useState<Team>(null);
	const [opponentTeam, setOpponentTeam] = useState<Team>(null);
	const [activePlayerPokemon, setActivePlayerPokemon] =
		useState<Pokemon>(null);
	const [activeOpponentPokemon, setActiveOpponentPokemon] =
		useState<Pokemon>(null);
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [opponentReady, setOpponentReady] = useState<boolean>(false);

	const [currentView, setCurrentView] = useState<'player' | 'opponent'>(
		'player'
	);

	const recreatePokemonFromParsed = (parsedPokemon: Pokemon): Pokemon => {
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
		const moves = parsedPokemon.moves.map((parsedMove: any) => {
			return new Move(
				parsedMove.id,
				parsedMove.name,
				parsedMove.power,
				parsedMove.accuracy,
				parsedMove.pp,
				parsedMove.meta,
				parsedMove.type,
				parsedMove.category,
				parsedMove.description,
				parsedMove.priority,
				parsedMove.target,
				parsedMove.effects
			);
		});
		return new Pokemon(
			parsedPokemon.pokedexId,
			parsedPokemon.name,
			parsedPokemon.types,
			parsedPokemon.level,
			parsedPokemon.ability,
			parsedPokemon.nature,
			parsedPokemon.gender,
			parsedPokemon.isShiny,
			moves,
			parsedPokemon.item,
			parsedPokemon.stats,
			parsedPokemon.weight,
			parsedPokemon.activeMove,
			status,
			volatileStatus
		);
	};

	const handleMoveSelection = (move: Move) => {
		if (move.pp === 0) return;

		if (currentView === 'player') {
			let updatedPlayerPokemon = activePlayerPokemon.changeActiveMove(move);
			setActivePlayerPokemon(updatedPlayerPokemon);
			setCurrentView('opponent');
			handlePlayerReady();
		} else {
			let updatedOpponentPokemon =
				activeOpponentPokemon.changeActiveMove(move);
			setActiveOpponentPokemon(updatedOpponentPokemon);
			handleOpponentReady();
			setCurrentView('player');
		}
	};

	const handlePlayerReady = () => {
		setPlayerReady(true);
	};

	const handleOpponentReady = () => {
		setOpponentReady(true);
	};

	const handlePlayerAttack = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		console.log('movePlayer', activePlayerPokemon.activeMove);
		if (activePlayerPokemon.activeMove.target === 'user') {
			const updatedPokemon = activePlayerPokemon.attack(activePlayerPokemon);
			setActivePlayerPokemon(updatedPokemon);
		} else {
			const updatedPokemon = activePlayerPokemon.attack(
				activeOpponentPokemon
			);
			setActiveOpponentPokemon(updatedPokemon);
		}
	};

	const handleOpponentAttack = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		console.log('moveOpponent', activeOpponentPokemon.activeMove);
		if (activeOpponentPokemon.activeMove.target === 'user') {
			const updatedPokemon = activeOpponentPokemon.attack(
				activeOpponentPokemon
			);
			setActiveOpponentPokemon(updatedPokemon);
		} else {
			const updatedPokemon =
				activeOpponentPokemon.attack(activePlayerPokemon);
			setActivePlayerPokemon(updatedPokemon);
		}
	};

	const handleAttacksByPriority = (
		activePlayerPokemon: Pokemon,
		opponentPlayerPokemon: Pokemon
	) => {
		const playerSpeed = activePlayerPokemon.getStat('speed').value;
		const opponentSpeed = opponentPlayerPokemon.getStat('speed').value;

		if (playerSpeed > opponentSpeed) {
			handlePlayerAttack(activePlayerPokemon, opponentPlayerPokemon);
			handleOpponentAttack(activePlayerPokemon, opponentPlayerPokemon);
		} else if (playerSpeed < opponentSpeed) {
			handleOpponentAttack(activePlayerPokemon, opponentPlayerPokemon);
			handlePlayerAttack(activePlayerPokemon, opponentPlayerPokemon);
		} else {
			const random = Math.random();
			if (random < 0.5) {
				handlePlayerAttack(activePlayerPokemon, opponentPlayerPokemon);
				handleOpponentAttack(activePlayerPokemon, opponentPlayerPokemon);
			} else {
				handleOpponentAttack(activePlayerPokemon, opponentPlayerPokemon);
				handlePlayerAttack(activePlayerPokemon, opponentPlayerPokemon);
			}
		}
	};

	// STATUS
	const handlePoisoning = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		if (activePlayerPokemon.status.name === 'PSN') {
			const updatedPokemon = activePlayerPokemon.sufferFromStatus();
			setActivePlayerPokemon(updatedPokemon);
		}

		if (activeOpponentPokemon.status.name === 'PSN') {
			const updatedPokemon = activeOpponentPokemon.sufferFromStatus();
			setActiveOpponentPokemon(updatedPokemon);
		}
	};

	const handleSleeping = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		if (activePlayerPokemon.status.name === 'SLP') {
			let updatedStatus = activePlayerPokemon.status.setCounter(
				activePlayerPokemon.status.counter - 1
			);
			if (updatedStatus.counter === 0) {
				updatedStatus = new Status('', '', 0, true);
			}
			const updatedPokemon = activePlayerPokemon.changeStatus(updatedStatus);
			setActivePlayerPokemon(updatedPokemon);
		}

		if (activeOpponentPokemon.status.name === 'SLP') {
			let updatedStatus = activeOpponentPokemon.status.setCounter(
				activeOpponentPokemon.status.counter - 1
			);
			if (updatedStatus.counter === 0) {
				updatedStatus = new Status('', '', 0, true);
			}
			const updatedPokemon =
				activeOpponentPokemon.changeStatus(updatedStatus);
			setActiveOpponentPokemon(updatedPokemon);
		}
	};

	const handleConfusion = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		if (activePlayerPokemon.volatileStatus.name === 'CNF') {
			const random = Math.random();
			if (random > 0.5) {
				return;
			}
		}

		if (activeOpponentPokemon.volatileStatus.name === 'CNF') {
			const random = Math.random();
			if (random > 0.5) {
				return;
			}
		}
	};

	const handleParalysis = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		if (activePlayerPokemon.status.name === 'PAR') {
			let updatedStatus = activePlayerPokemon.status.setAbleToMove(false);
			const random = Math.random();
			if (random < PARALYSIS_CHANCE) {
				updatedStatus = updatedStatus.setAbleToMove(true);
			}
			const updatedPokemon = activePlayerPokemon.changeStatus(updatedStatus);
			setActivePlayerPokemon(updatedPokemon);
		}

		if (activeOpponentPokemon.status.name === 'PAR') {
			let updatedStatus = activeOpponentPokemon.status.setAbleToMove(false);
			const random = Math.random();
			if (random < PARALYSIS_CHANCE) {
				updatedStatus = updatedStatus.setAbleToMove(true);
			}
			const updatedPokemon =
				activeOpponentPokemon.changeStatus(updatedStatus);
			setActiveOpponentPokemon(updatedPokemon);
		}
	};

	const handleThawing = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		if (activePlayerPokemon.status.name === 'FRZ') {
			const random = Math.random();
			if (random < THAW_CHANCE) {
				const updatedStatus = new Status('', '', 0, true);
				const updatedPokemon =
					activePlayerPokemon.changeStatus(updatedStatus);
				setActivePlayerPokemon(updatedPokemon);
			}
		}

		if (activeOpponentPokemon.status.name === 'FRZ') {
			const random = Math.random();
			if (random < THAW_CHANCE) {
				const updatedStatus = new Status('', '', 0, true);
				const updatedPokemon =
					activeOpponentPokemon.changeStatus(updatedStatus);
				setActiveOpponentPokemon(updatedPokemon);
			}
		}
	};

	const handleBurning = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		if (activePlayerPokemon.status.name === 'BRN') {
			const updatedPokemon = activePlayerPokemon.sufferFromStatus();
			setActivePlayerPokemon(updatedPokemon);
		}

		if (activeOpponentPokemon.status.name === 'BRN') {
			const updatedPokemon = activeOpponentPokemon.sufferFromStatus();
			setActiveOpponentPokemon(updatedPokemon);
		}
	};

	const syncBattleToLocalStorage = (
		playerTeam: Team,
		opponentTeam: Team,
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon,
		activeTurn: number
	) => {
		const localStorageBattle = {
			playerTeam,
			opponentTeam,
			activePlayerPokemon,
			activeOpponentPokemon,
			turn: activeTurn
		};
		localStorage.setItem('battle', JSON.stringify(localStorageBattle));
	};

	useEffect(() => {
		if (!battle) return;
		const localStorageBattle = JSON.parse(localStorage.getItem('battle'));
		const parsedPlayerPokemon = localStorageBattle.activePlayerPokemon;

		const parsedOpponentPokemon = localStorageBattle.activeOpponentPokemon;

		const playerPokemon = recreatePokemonFromParsed(parsedPlayerPokemon);
		const opponentPokemon = recreatePokemonFromParsed(parsedOpponentPokemon);
		if (localStorageBattle) {
			setPlayerTeam(localStorageBattle.playerTeam);
			setOpponentTeam(localStorageBattle.opponentTeam);
			setActivePlayerPokemon(playerPokemon);
			setActiveOpponentPokemon(opponentPokemon);
			setActiveTurn(localStorageBattle.turn);
		} else if (battle) {
			setPlayerTeam(battle.playerTeam);
			setOpponentTeam(battle.opponentTeam);
			setActivePlayerPokemon(
				recreatePokemonFromParsed(battle.activePlayerPokemon)
			);
			setActiveOpponentPokemon(
				recreatePokemonFromParsed(battle.activeOpponentPokemon)
			);
			setActiveTurn(battle.turn);
			syncBattleToLocalStorage(
				battle.playerTeam,
				battle.opponentTeam,
				battle.activePlayerPokemon,
				battle.activeOpponentPokemon,
				battle.turn
			);
		}

		setIsInitialized(true);
	}, [battle]);

	useEffect(() => {
		if (!isInitialized) return;
		syncBattleToLocalStorage(
			playerTeam,
			opponentTeam,
			activePlayerPokemon,
			activeOpponentPokemon,
			activeTurn
		);
	}, [
		isInitialized,
		playerTeam,
		opponentTeam,
		activePlayerPokemon,
		activeOpponentPokemon,
		activeTurn
	]);

	// BATTLE
	useEffect(() => {
		if (!playerReady || !opponentReady) return;
		handleSleeping(activePlayerPokemon, activeOpponentPokemon);
		handleConfusion(activePlayerPokemon, activeOpponentPokemon);
		handleParalysis(activePlayerPokemon, activeOpponentPokemon);
		handleAttacksByPriority(activePlayerPokemon, activeOpponentPokemon);
		handleThawing(activePlayerPokemon, activeOpponentPokemon);
		handlePoisoning(activePlayerPokemon, activeOpponentPokemon);
		handleBurning(activePlayerPokemon, activeOpponentPokemon);
		setPlayerReady(false);
		setOpponentReady(false);
	}, [playerReady, opponentReady]);

	if (
		!playerTeam ||
		!opponentTeam ||
		!activePlayerPokemon ||
		!activeOpponentPokemon
	)
		return null;

	return (
		<div className={`battle-container ${activeTheme}`}>
			<div className={'battle-background'}>
				<CustomImage
					src={`/images/compressed/backgrounds/bg-battle-${activeTheme}.jpg`}
					alt={'background arena'}
					width={10000}
					height={10000}
				/>
			</div>

			<div className={'battle-theme'}>
				<button
					className={`theme-btn btn-primary ${activeTheme} fadeInToBottom`}
					onClick={() =>
						activeTheme === 'day'
							? setActiveTheme('night')
							: setActiveTheme('day')
					}
				>
					{activeTheme === 'day' ? <Moon /> : <Sun />}
				</button>
			</div>

			<div className={'battle-turn'}>Turn {activeTurn}</div>

			<div className={'battle-global-infos'}></div>

			{currentView === 'player' ? (
				<>
					<div className={'battle-team player'}>
						<BattleTeamCard
							team={playerTeam}
							activePokemon={activePlayerPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActivePlayerPokemon}
							player={true}
						/>
					</div>

					<div className={'battle-team opponent'}>
						<BattleTeamCard
							team={opponentTeam}
							activePokemon={activeOpponentPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActiveOpponentPokemon}
							player={false}
						/>
					</div>

					<div className={'battle-pokemon player'}>
						<BattlePokemonCard
							activePokemon={activePlayerPokemon}
							player={true}
						/>
					</div>

					<div className={'battle-pokemon opponent'}>
						<BattlePokemonCard
							activePokemon={activeOpponentPokemon}
							player={false}
						/>
					</div>

					<BattleActions
						playerPokemon={activePlayerPokemon}
						handleMoveSelection={handleMoveSelection}
					/>
				</>
			) : (
				<>
					<div className={'battle-team player'}>
						<BattleTeamCard
							team={opponentTeam}
							activePokemon={activeOpponentPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActiveOpponentPokemon}
							player={false}
						/>
					</div>

					<div className={'battle-team opponent'}>
						<BattleTeamCard
							team={playerTeam}
							activePokemon={activePlayerPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActivePlayerPokemon}
							player={true}
						/>
					</div>

					<div className={'battle-pokemon player'}>
						<BattlePokemonCard
							activePokemon={activeOpponentPokemon}
							player={false}
						/>
					</div>

					<div className={'battle-pokemon opponent'}>
						<BattlePokemonCard
							activePokemon={activePlayerPokemon}
							player={true}
						/>
					</div>

					<BattleActions
						playerPokemon={activeOpponentPokemon}
						handleMoveSelection={handleMoveSelection}
					/>
				</>
			)}
		</div>
	);
};

export default Battle;

// 'use client';
//
// import { useEffect, useState } from 'react';
//
// // Classes
// import Pokemon from '../../../back/classes/pokemon';
// import BattleClass from '../../../back/classes/battle';
// import Move from '../../../back/classes/move';
// import Status from '../../../back/classes/status';
// import { THAW_CHANCE, PARALYSIS_CHANCE, CONFUSED_MOVE } from './constants';
// import CustomImage from '../../../front/components/customImage';
// import { Moon, Sun } from 'lucide-react';
//
// // Interfaces
// interface BattleProps {
// 	battle: BattleClass;
// }
//
// const Battle = ({ battle }: BattleProps) => {
// 	const [activeTheme, setActiveTheme] = useState<string>('day');
// 	const [activeTurn, setActiveTurn] = useState<number>(1);
//
// 	// States
// 	const [playerTeam, setPlayerTeam] = useState<Pokemon[]>([]);
// 	const [opponentTeam, setOpponentTeam] = useState<Pokemon[]>([]);
// 	const [playerTeamShowed, setPlayerTeamShowed] = useState<boolean>(false);
// 	const [opponentTeamShowed, setOpponentTeamShowed] = useState<boolean>(false);
// 	const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>();
// 	const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>();
// 	const [temporaryPlayerPokemon, setTemporaryPlayerPokemon] =
// 		useState<Pokemon | null>();
// 	const [temporaryOpponentPokemon, setTemporaryOpponentPokemon] =
// 		useState<Pokemon | null>();
// 	const [playerReady, setPlayerReady] = useState<boolean>(false);
// 	const [opponentReady, setOpponentReady] = useState<boolean>(false);
// 	const [battleWinner, setBattleWinner] = useState<string>('');
// 	const [playerMovesShowed, setPlayerMovesShowed] = useState<boolean>(false);
// 	const [opponentMovesShowed, setOpponentMovesShowed] =
// 		useState<boolean>(false);
//
// 	// Utilitaires
// 	function storePlayerPokemon(updatedPokemon: Pokemon) {
// 		setPlayerPokemon(updatedPokemon);
// 		updateTeamWithNewPokemon(updatedPokemon, setPlayerTeam);
// 		localStorage.setItem('playerPokemon', JSON.stringify(updatedPokemon));
// 	}
// 	function storeOpponentPokemon(updatedPokemon: Pokemon) {
// 		setOpponentPokemon(updatedPokemon);
// 		updateTeamWithNewPokemon(updatedPokemon, setOpponentTeam);
// 		localStorage.setItem('opponentPokemon', JSON.stringify(updatedPokemon));
// 	}
// 	function updateTeamWithNewPokemon(
// 		updatedPokemon: Pokemon,
// 		setTeam: Function
// 	) {
// 		setTeam((team: Pokemon[]) =>
// 			team.map(pokemon =>
// 				pokemon.name === updatedPokemon.name ? updatedPokemon : pokemon
// 			)
// 		);
// 	}
//
// 	function getPlayerFromStore() {
// 		const parsedPlayerPokemon = JSON.parse(
// 			localStorage.getItem('playerPokemon')
// 		);
// 		const playerPokemon = recreatePokemonFromParsed(parsedPlayerPokemon);
// 		return playerPokemon;
// 	}
// 	function getPlayerTeamFromStore() {
// 		const parsedPlayerTeam = JSON.parse(localStorage.getItem('playerTeam'));
// 		const playerTeam = parsedPlayerTeam.map((parsedPokemon: Pokemon) => {
// 			return recreatePokemonFromParsed(parsedPokemon);
// 		});
// 		return playerTeam;
// 	}
// 	function getOpponentFromStore() {
// 		const parsedOpponentPokemon = JSON.parse(
// 			localStorage.getItem('opponentPokemon')
// 		);
// 		const opponentPokemon = recreatePokemonFromParsed(parsedOpponentPokemon);
// 		return opponentPokemon;
// 	}
// 	function getOpponentTeamFromStore() {
// 		const parsedOpponentTeam = JSON.parse(
// 			localStorage.getItem('opponentTeam')
// 		);
// 		const opponentTeam = parsedOpponentTeam.map((parsedPokemon: Pokemon) => {
// 			return recreatePokemonFromParsed(parsedPokemon);
// 		});
// 		return opponentTeam;
// 	}
//
// 	// Récupération des pokémons depuis le localStorage ou la room
// 	useEffect(() => {
// 		if (!battle) return;
// 		const playerStoredPokemon = localStorage.getItem('playerPokemon');
// 		const opponentStoredPokemon = localStorage.getItem('opponentPokemon');
// 		const playerStoredTeam = localStorage.getItem('playerTeam');
// 		const opponentStoredTeam = localStorage.getItem('opponentTeam');
//
// 		if (playerStoredPokemon && opponentStoredPokemon) {
// 			setPlayerPokemon(getPlayerFromStore());
// 			setOpponentPokemon(getOpponentFromStore());
// 		} else {
// 			setPlayerPokemon(battle.playerPokemon);
// 			setOpponentPokemon(battle.opponentPokemon);
// 		}
//
// 		if (playerStoredTeam && opponentStoredTeam) {
// 			setPlayerTeam(getPlayerTeamFromStore());
// 			setOpponentTeam(getOpponentTeamFromStore());
// 		} else {
// 			setPlayerTeam([battle.playerPokemon]);
// 			setOpponentTeam([battle.opponentPokemon]);
// 		}
// 	}, [battle]);
//
// 	//
//
// 	// Déroulement des attaques une fois les 2 joueurs prêts
// 	useEffect(() => {
// 		if (!playerReady || !opponentReady) return;
// 		handlePokemonSelection();
// 		handleSleeping();
// 		handleConfusion();
// 		handleParalysis();
// 		handleAttacksByPriority();
// 		handleActiveMovesPpReduction();
// 		handleThawing();
// 		handlePoisoning();
// 		handleBurning();
// 		setPlayerReady(false);
// 		setOpponentReady(false);
// 	}, [playerReady, opponentReady]);
//
// 	// Détermination du gagnant
// 	useEffect(() => {
// 		if (playerPokemon?.status.name === 'KO') {
// 			setBattleWinner('Opponent wins!');
// 		}
// 		if (opponentPokemon?.status.name === 'KO') {
// 			setBattleWinner('Player wins!');
// 		}
// 	}, [playerPokemon, opponentPokemon]);
//
//

//
// 	const handleActiveMovesPpReduction = () => {
// 		let updatedPlayerPokemon: Pokemon = getPlayerFromStore();
// 		let updatedOpponentPokemon: Pokemon = getOpponentFromStore();
// 		let updatedPlayerMoves: Move[] = updatedPlayerPokemon.moves;
// 		let updatedOpponentMoves: Move[] = updatedOpponentPokemon.moves;
// 		updatedPlayerMoves = updatedPlayerMoves.map((move: Move) =>
// 			move.name === updatedPlayerPokemon.activeMove.name
// 				? move.decreasePP()
// 				: move
// 		);
// 		updatedOpponentMoves = updatedOpponentMoves.map((move: Move) =>
// 			move.name === updatedOpponentPokemon.activeMove.name
// 				? move.decreasePP()
// 				: move
// 		);
// 		updatedPlayerPokemon =
// 			updatedPlayerPokemon.updateMoves(updatedPlayerMoves);
// 		updatedOpponentPokemon =
// 			updatedOpponentPokemon.updateMoves(updatedOpponentMoves);
// 		storePlayerPokemon(updatedPlayerPokemon);
// 		storeOpponentPokemon(updatedOpponentPokemon);
// 	};
//
// 	const handlePlayerMoveSelection = (move: Move) => {
// 		if (move.pp === 0) return;
// 		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
// 		playerUpdatedPokemon = playerUpdatedPokemon.changeActiveMove(move);
// 		storePlayerPokemon(playerUpdatedPokemon);
// 		handlePlayerReady();
// 	};
//
// 	const handleOpponentMoveSelection = (move: Move) => {
// 		if (move.pp === 0) return;
// 		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();
// 		opponentUpdatedPokemon = opponentUpdatedPokemon.changeActiveMove(move);
// 		storeOpponentPokemon(opponentUpdatedPokemon);
// 		handleOpponentReady();
// 	};
//
// 	const handlePokemonSelection = () => {
// 		if (temporaryPlayerPokemon) {
// 			setPlayerPokemon(temporaryPlayerPokemon);
// 			storePlayerPokemon(temporaryPlayerPokemon);
// 		}
// 		if (temporaryOpponentPokemon) {
// 			setOpponentPokemon(temporaryOpponentPokemon);
// 			storeOpponentPokemon(temporaryOpponentPokemon);
// 		}
// 	};
// 	const handleOpponentAttack = () => {
// 		let playerUpdatedPokemon: Pokemon = getPlayerFromStore();
// 		let opponentUpdatedPokemon: Pokemon = getOpponentFromStore();
//
// 		if (!opponentUpdatedPokemon.status.ableToMove) return;
//
// 		if (opponentUpdatedPokemon.activeMove.target === 'user') {
// 			const updatedPokemon = opponentUpdatedPokemon.attack(
// 				opponentUpdatedPokemon
// 			);
// 			storeOpponentPokemon(updatedPokemon);
// 		} else {
// 			const updatedPokemon =
// 				opponentUpdatedPokemon.attack(playerUpdatedPokemon);
// 			storePlayerPokemon(updatedPokemon);
// 		}
// 	};
//
// 	const handlePlayerReady = () => {
// 		setPlayerReady(true);
// 	};
//
// 	const handleOpponentReady = () => {
// 		setOpponentReady(true);
// 	};
//
// 	return (
// 		<div className={`battle-container ${activeTheme}`}>
// 			<div className={'battle-background'}>
// 				<CustomImage
// 					src={`/images/compressed/backgrounds/bg-battle-${activeTheme}.jpg`}
// 					alt={'background arena'}
// 					fill={true}
// 					sizes={'100vw'}
// 				/>
// 			</div>
//
// 			<div className={'battle-theme'}>
// 				<button
// 					onClick={() =>
// 						activeTheme === 'day'
// 							? setActiveTheme('night')
// 							: setActiveTheme('day')
// 					}
// 				>
// 					{activeTheme === 'day' ? <Moon /> : <Sun />}
// 				</button>
// 			</div>
//
// 			<div className={'battle-turn'}>Turn {activeTurn}</div>
//
// 			<div className={'battle-global-infos'}></div>
//
// 			<div className={'battle-team player'}>
// 				<div className={'battle-team-container'}>
// 					<div className={'battle-team-avatar'}>Ici avatar du joueur</div>
// 					<div className={'battle-team-pokemons'}>
// 						{playerTeam.map((pokemon: Pokemon) => (
// 							<div
// 								key={pokemon.name}
// 								className={`battle-team-pokemon ${
// 									pokemon.name === playerPokemon?.name ? 'active' : ''
// 								}`}
// 							>
// 								<CustomImage
// 									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
// 									alt={pokemon.name}
// 									width={30}
// 									height={30}
// 								/>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
//
// 			<div className={'battle-team opponent'}>
// 				<div className={'battle-team-container'}>
// 					<div className={'battle-team-avatar'}>Ici avatar du joueur</div>
// 					<div className={'battle-team-pokemons'}>
// 						{opponentTeam.map((pokemon: Pokemon) => (
// 							<div
// 								key={pokemon.name}
// 								className={`battle-team-pokemon ${
// 									pokemon.name === playerPokemon?.name ? 'active' : ''
// 								}`}
// 							>
// 								<CustomImage
// 									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
// 									alt={pokemon.name}
// 									width={30}
// 									height={30}
// 								/>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 			{/* Affichage des informations du Pokemon de l'adversaire */}
// 			<p>
// 				{opponentPokemon?.name + ' '}
// 				{opponentPokemon?.getStat('hp').value +
// 					'/' +
// 					opponentPokemon?.getStat('hp').max}
// 				<br />
// 				{'status ' + opponentPokemon?.status.name
// 					? opponentPokemon?.status.name
// 					: ''}
// 				<br />
// 				{'volatileStatus' + opponentPokemon?.volatileStatus.name
// 					? opponentPokemon?.volatileStatus.name
// 					: ''}
// 			</p>
//
// 			{/* Bouton Team de l'adversaire */}
// 			<button
// 				onClick={() => {
// 					setOpponentMovesShowed(false);
// 					setOpponentTeamShowed(!opponentTeamShowed);
// 				}}
// 			>
// 				Team
// 			</button>
//
// 			{/* Bouton Attack de l'adversaire */}
// 			<button
// 				onClick={() => {
// 					setOpponentTeamShowed(false);
// 					setOpponentMovesShowed(!opponentMovesShowed);
// 				}}
// 			>
// 				Attack
// 			</button>
//
// 			{/* Affichage des Pokémons de l'adversaire */}
// 			{opponentTeamShowed && (
// 				<div>
// 					{opponentTeam.map((pokemon: Pokemon) => (
// 						<button
// 							key={pokemon.name}
// 							onClick={() => {
// 								setTemporaryOpponentPokemon(pokemon);
// 								setOpponentReady(true);
// 							}}
// 						>
// 							{pokemon.name}
// 						</button>
// 					))}
// 				</div>
// 			)}
//
// 			{/* Affichage des moves de l'adversaire */}
// 			{opponentMovesShowed && (
// 				<div>
// 					{opponentPokemon.moves.map((move: Move) => (
// 						<button
// 							key={move.name}
// 							onClick={() => {
// 								handleOpponentMoveSelection(move);
// 							}}
// 						>
// 							{move.name}
// 						</button>
// 					))}
// 				</div>
// 			)}
//
// 			{/* Affichage des informations du Pokemon du joueur */}
// 			<p>
// 				{playerPokemon?.name + ' '}
// 				{playerPokemon?.getStat('hp').value +
// 					'/' +
// 					playerPokemon?.getStat('hp').max}
// 				<br />
// 				{'status ' + playerPokemon?.status.name
// 					? playerPokemon?.status.name
// 					: ''}
// 				<br />
// 				{'volatileStatus' + playerPokemon?.volatileStatus.name
// 					? playerPokemon?.volatileStatus.name
// 					: ''}
// 			</p>
//
// 			{/* Bouton Team du joueur */}
// 			<button
// 				onClick={() => {
// 					setPlayerMovesShowed(false);
// 					setPlayerTeamShowed(!playerTeamShowed);
// 				}}
// 			>
// 				Team
// 			</button>
//
// 			{/* Bouton Attack du joueur */}
// 			<button
// 				onClick={() => {
// 					setPlayerTeamShowed(false);
// 					setPlayerMovesShowed(!playerMovesShowed);
// 				}}
// 			>
// 				Attack
// 			</button>
//
// 			{/* Affichage des Pokémons du joueur */}
// 			{playerTeamShowed && (
// 				<div>
// 					{playerTeam.map((pokemon: Pokemon) => (
// 						<button
// 							key={pokemon.name}
// 							onClick={() => {
// 								setTemporaryPlayerPokemon(pokemon);
// 								setPlayerReady(true);
// 							}}
// 						>
// 							{pokemon.name}
// 						</button>
// 					))}
// 				</div>
// 			)}
//
// 			{/* Affichage des moves du joueur */}
// 			{playerMovesShowed && (
// 				<div>
// 					{playerPokemon.moves.map((move: Move) => (
// 						<button
// 							key={move.name}
// 							onClick={() => {
// 								handlePlayerMoveSelection(move);
// 							}}
// 						>
// 							{move.name}
// 						</button>
// 					))}
// 				</div>
// 			)}
//
// 			{/* Affichage du vainqueur */}
// 			{battleWinner && <h1>{battleWinner}</h1>}
// 		</div>
// 	);
// };
// export default Battle;
