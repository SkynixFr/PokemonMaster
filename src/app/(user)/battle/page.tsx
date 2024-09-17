'use client';

import React, { useEffect, useState } from 'react';

// Components
import CustomImage from '../../../front/components/customImage';
import BattleTeamCard from '../../../front/components/battle/battleTeamCard';
import BattlePokemonCard from '../../../front/components/battle/battlePokemonCard';
import BattlePokemonKo from '../../../front/components/battle/battlePokemonKo';
import BattleToast from '../../../front/components/battle/battleToast';

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
import { Notification } from '../../../interfaces/battle/notitication';

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
	const [activePlayerPokemonKo, setActivePlayerPokemonKo] =
		useState<boolean>(false);
	const [activeOpponentPokemonKo, setActiveOpponentPokemonKo] =
		useState<boolean>(false);

	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [currentNotification, setCurrentNotification] =
		useState<Notification>(null);
	const [isNotificationActive, setIsNotificationActive] =
		useState<boolean>(false);
	const [pokemonStatuses, setPokemonStatuses] = useState<string[]>([]);

	const addNotification = (notification: Notification) => {
		setNotifications(notifications => [...notifications, notification]);
	};

	const handleNotificationStatusEffect = (
		status: string,
		pokemonName: string,
		userAvatar: { name: string; sprite: string }
	) => {
		const currentStatus = pokemonStatuses[pokemonName];

		if (currentStatus === status || currentStatus) return;

		addNotification({
			pokemonName,
			statusEffect: {
				type:
					status === 'PSN'
						? 'poison'
						: status === 'BRN'
							? 'fire'
							: status === 'SLP'
								? 'normal'
								: status === 'CNF'
									? 'ghost'
									: status === 'PAR'
										? 'electric'
										: status === 'FRZ'
											? 'ice'
											: '',
				name:
					status === 'PSN'
						? 'is poisoned'
						: status === 'SLP'
							? 'fell asleep'
							: status === 'CNF'
								? 'is confused'
								: status === 'PAR'
									? 'is paralyzed'
									: status === 'FRZ'
										? 'is frozen'
										: status === 'BRN'
											? 'is burned'
											: ''
			},
			userAvatar
		});

		setPokemonStatuses({ ...pokemonStatuses, [pokemonName]: status });
	};

	useEffect(() => {
		if (!notifications.length || currentNotification) return;
		const showNotification = () => {
			setIsNotificationActive(true);
			setCurrentNotification(notifications[0]);

			setTimeout(() => {
				setCurrentNotification(null);
				setNotifications(notifications => notifications.slice(1));
				setIsNotificationActive(false);
			}, 2000);
		};
		showNotification();
	}, [currentNotification, notifications]);

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
			volatileStatus,
			parsedPokemon.index
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

	const handlePlayerAttack = () => {
		addNotification({
			pokemonName: activePlayerPokemon.name,
			move: {
				name: activePlayerPokemon.activeMove.name,
				type: activePlayerPokemon.activeMove.type
			},
			userAvatar: {
				name: playerTeam.avatar.name,
				sprite: playerTeam.avatar.sprite
			}
		});

		if (activePlayerPokemon.activeMove.target === 'user') {
			const updatedPokemon = activePlayerPokemon.attack(activePlayerPokemon);
			setActivePlayerPokemon(updatedPokemon);
			handlePlayerTeam(updatedPokemon);
		} else {
			const updatedPokemon = activePlayerPokemon.attack(
				activeOpponentPokemon
			);

			if (updatedPokemon.status.name !== '') {
				handleNotificationStatusEffect(
					updatedPokemon.status.name,
					updatedPokemon.name,
					opponentTeam.avatar
				);
			}

			setActiveOpponentPokemon(updatedPokemon);
			handleOpponentTeam(updatedPokemon);
		}
	};

	const handlePlayerTeam = (updatedPokemon: Pokemon) => {
		const updatedPlayerTeam = playerTeam.pokemons.map(pokemon =>
			pokemon.index === updatedPokemon.index ? updatedPokemon : pokemon
		);

		const playerTeamUpdated = new Team(
			playerTeam.id,
			playerTeam.name,
			playerTeam.avatar,
			updatedPlayerTeam
		);

		setPlayerTeam(playerTeamUpdated);
	};
	const handleOpponentTeam = (updatedPokemon: Pokemon) => {
		const updatedOpponentTeam = opponentTeam.pokemons.map(pokemon =>
			pokemon.index === updatedPokemon.index ? updatedPokemon : pokemon
		);

		const opponentTeamUpdated = new Team(
			opponentTeam.id,
			opponentTeam.name,
			opponentTeam.avatar,
			updatedOpponentTeam
		);

		setOpponentTeam(opponentTeamUpdated);
	};

	const handleOpponentAttack = () => {
		addNotification({
			pokemonName: activeOpponentPokemon.name,
			move: {
				name: activeOpponentPokemon.activeMove.name,
				type: activeOpponentPokemon.activeMove.type
			},
			userAvatar: {
				name: opponentTeam.avatar.name,
				sprite: opponentTeam.avatar.sprite
			}
		});

		if (activeOpponentPokemon.activeMove.target === 'user') {
			const updatedPokemon = activeOpponentPokemon.attack(
				activeOpponentPokemon
			);
			setActiveOpponentPokemon(updatedPokemon);
			handleOpponentTeam(updatedPokemon);
		} else {
			const updatedPokemon =
				activeOpponentPokemon.attack(activePlayerPokemon);

			if (updatedPokemon.status.name !== '') {
				handleNotificationStatusEffect(
					updatedPokemon.status.name,
					updatedPokemon.name,
					playerTeam.avatar
				);
			}

			setActivePlayerPokemon(updatedPokemon);
			handlePlayerTeam(updatedPokemon);
		}
	};

	const handleAttacksByPriority = () => {
		const playerSpeed = activePlayerPokemon.getStat('speed').value;
		const opponentSpeed = activeOpponentPokemon.getStat('speed').value;

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
	};

	// STATUS
	const handlePoisoning = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		if (activePlayerPokemon.status.name === 'PSN') {
			const updatedPokemon = activePlayerPokemon.sufferFromStatus();
			setActivePlayerPokemon(updatedPokemon);
			addNotification({
				pokemonName: activePlayerPokemon.name,
				statusEffect: {
					type: 'poison',
					name: 'suffering from poison'
				},
				userAvatar: {
					name: playerTeam.avatar.name,
					sprite: playerTeam.avatar.sprite
				}
			});
		}

		if (activeOpponentPokemon.status.name === 'PSN') {
			const updatedPokemon = activeOpponentPokemon.sufferFromStatus();
			setActiveOpponentPokemon(updatedPokemon);
			addNotification({
				pokemonName: activeOpponentPokemon.name,
				statusEffect: {
					type: 'poison',
					name: 'suffer from poison'
				},
				userAvatar: {
					name: opponentTeam.avatar.name,
					sprite: opponentTeam.avatar.sprite
				}
			});
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
				addNotification({
					pokemonName: activePlayerPokemon.name,
					statusEffect: {
						type: 'normal',
						name: 'woke up'
					},
					userAvatar: {
						name: playerTeam.avatar.name,
						sprite: playerTeam.avatar.sprite
					}
				});
			}
			const updatedPokemon = activePlayerPokemon.changeStatus(updatedStatus);
			setActivePlayerPokemon(updatedPokemon);
			addNotification({
				pokemonName: activePlayerPokemon.name,
				statusEffect: {
					type: 'normal',
					name: 'sleeping'
				},
				userAvatar: {
					name: playerTeam.avatar.name,
					sprite: playerTeam.avatar.sprite
				}
			});
		}

		if (activeOpponentPokemon.status.name === 'SLP') {
			let updatedStatus = activeOpponentPokemon.status.setCounter(
				activeOpponentPokemon.status.counter - 1
			);
			if (updatedStatus.counter === 0) {
				updatedStatus = new Status('', '', 0, true);
				addNotification({
					pokemonName: activeOpponentPokemon.name,
					statusEffect: {
						type: 'normal',
						name: 'woke up'
					},
					userAvatar: {
						name: opponentTeam.avatar.name,
						sprite: opponentTeam.avatar.sprite
					}
				});
			}
			const updatedPokemon =
				activeOpponentPokemon.changeStatus(updatedStatus);
			setActiveOpponentPokemon(updatedPokemon);
			addNotification({
				pokemonName: activeOpponentPokemon.name,
				statusEffect: {
					type: 'normal',
					name: 'sleeping'
				},
				userAvatar: {
					name: opponentTeam.avatar.name,
					sprite: opponentTeam.avatar.sprite
				}
			});
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

	// KO
	const handlePlayerKo = () => {
		if (activePlayerPokemon.getStat('hp').value === 0) {
			addNotification({
				pokemonName: activePlayerPokemon.name,
				userAvatar: {
					name: playerTeam.avatar.name,
					sprite: playerTeam.avatar.sprite
				},
				isKo: true
			});

			setCurrentView('player');
			setActivePlayerPokemonKo(true);
		}
	};

	const handleOpponentKo = () => {
		if (activeOpponentPokemon.getStat('hp').value === 0) {
			addNotification({
				pokemonName: activeOpponentPokemon.name,
				userAvatar: {
					name: opponentTeam.avatar.name,
					sprite: opponentTeam.avatar.sprite
				},
				isKo: true
			});
			setCurrentView('opponent');
			setActiveOpponentPokemonKo(true);
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
		handleAttacksByPriority();
		handleThawing(activePlayerPokemon, activeOpponentPokemon);
		handlePoisoning(activePlayerPokemon, activeOpponentPokemon);
		handleBurning(activePlayerPokemon, activeOpponentPokemon);
		handlePlayerKo();
		handleOpponentKo();
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

			<BattleToast currentNotification={currentNotification} />

			{currentView === 'player' ? (
				<>
					<div className={'battle-team player'}>
						<BattleTeamCard
							team={playerTeam}
							activePokemon={activePlayerPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActivePlayerPokemon}
							player={true}
							currentView={currentView}
						/>
					</div>

					<div className={'battle-team opponent'}>
						<BattleTeamCard
							team={opponentTeam}
							activePokemon={activeOpponentPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActiveOpponentPokemon}
							player={false}
							currentView={currentView}
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
						disabled={isNotificationActive}
					/>

					{activePlayerPokemonKo ? (
						<BattlePokemonKo
							activePokemon={activePlayerPokemon}
							setActivePokemon={setActivePlayerPokemon}
							team={playerTeam}
							setActivePokemonKo={setActivePlayerPokemonKo}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setCurrentView={setCurrentView}
							player={true}
						/>
					) : (
						''
					)}
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
							currentView={currentView}
						/>
					</div>

					<div className={'battle-team opponent'}>
						<BattleTeamCard
							team={playerTeam}
							activePokemon={activePlayerPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActivePlayerPokemon}
							player={true}
							currentView={currentView}
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
						disabled={isNotificationActive}
					/>

					{activeOpponentPokemonKo ? (
						<BattlePokemonKo
							activePokemon={activeOpponentPokemon}
							setActivePokemon={setActiveOpponentPokemon}
							team={opponentTeam}
							setActivePokemonKo={setActiveOpponentPokemonKo}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setCurrentView={setCurrentView}
							player={false}
						/>
					) : (
						''
					)}
				</>
			)}
		</div>
	);
};

export default Battle;
