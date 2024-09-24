'use client';

import React, { useEffect, useState } from 'react';

// Components
import BattleToast from '../../../front/components/battle/battleToast';
import CustomImage from '../../../front/components/customImage';
import BattleTeamCard from '../../../front/components/battle/battleTeamCard';
import BattlePokemonCard from '../../../front/components/battle/battlePokemonCard';
import BattlePokemonKo from '../../../front/components/battle/battlePokemonKo';

//Icons
import { Moon, Sun } from 'lucide-react';

// Classes
import BattleClass from '../../../back/classes/battle';
import Team from '../../../back/classes/team';
import Pokemon from '../../../back/classes/pokemon';
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
import BattleEnd from '../../../front/components/battle/battleEnd';

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
	const [isSwitching, setIsSwitching] = useState<boolean>(false);
	const [justSwitchedPlayer, setJustSwitchedPlayer] = useState<boolean>(false);
	const [justSwitchedOpponent, setJustSwitchedOpponent] =
		useState<boolean>(false);
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
	const [battleTurnEnd, setBattleTurnEnd] = useState<boolean>(false);
	const [battleEnd, setBattleEnd] = useState<boolean>(false);
	const [counterPlayerPokemonKo, setCounterPlayerPokemonKo] =
		useState<number>(0);
	const [counterOpponentPokemonKo, setCounterOpponentPokemonKo] =
		useState<number>(0);

	const [previousPlayerPokemonHp, setPreviousPlayerPokemonHp] =
		useState<number>(0);
	const [previousOpponentPokemonHp, setPreviousOpponentPokemonHp] =
		useState<number>(0);

	// Notifications
	//---------------------------------------------------------
	const handleNotificationStatusEffect = (
		status: string,
		pokemonName: string,
		userAvatar: { name: string; sprite: string }
	) => {
		const currentStatus = pokemonStatuses[pokemonName];

		if (currentStatus === status || currentStatus || currentStatus === 'KO')
			return;

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
									? 'psychic'
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
											? 'is burnt'
											: ''
			},
			userAvatar,
			animationType: 'status'
		});

		setPokemonStatuses({ ...pokemonStatuses, [pokemonName]: status });
	};
	useEffect(() => {
		if (!notifications.length || currentNotification) return;

		setIsNotificationActive(true);

		if (battleTurnEnd) {
			const showNotification = async () => {
				await new Promise(resolve => setTimeout(resolve, 1000));
				setCurrentNotification(notifications[0]);

				setTimeout(() => {
					setCurrentNotification(null);
					setNotifications(notifications => notifications.slice(1));
				}, 5000);
			};
			showNotification().then();
		}
	}, [currentNotification, notifications, battleTurnEnd]);
	useEffect(() => {
		if (!notifications.length && !currentNotification) {
			setIsNotificationActive(false);
		}
	}, [notifications, currentNotification]);
	//---------------------------------------------------------

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
		const activeMove = moves.find(
			move => move.name === parsedPokemon.activeMove.name
		);
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
			activeMove,
			status,
			volatileStatus,
			parsedPokemon.index
		);
	};

	const getActivePokemonsFromLocalStorage = () => {
		const localStorageBattle = JSON.parse(localStorage.getItem('battle'));
		const parsedPlayerPokemon = localStorageBattle.activePlayerPokemon;

		const parsedOpponentPokemon = localStorageBattle.activeOpponentPokemon;

		const activePlayerPokemon =
			recreatePokemonFromParsed(parsedPlayerPokemon);
		const activeOpponentPokemon = recreatePokemonFromParsed(
			parsedOpponentPokemon
		);
		return { activePlayerPokemon, activeOpponentPokemon };
	};

	const handleMoveSelection = (move: Move) => {
		if (move.pp === 0) return;

		if (currentView === 'player') {
			let updatedPlayerPokemon = activePlayerPokemon.changeActiveMove(move);
			setActivePlayerPokemon(updatedPlayerPokemon);
			setIsSwitching(true);
			setCurrentView('opponent');
			handlePlayerReady();
		} else {
			let updatedOpponentPokemon =
				activeOpponentPokemon.changeActiveMove(move);
			setActiveOpponentPokemon(updatedOpponentPokemon);
			handleOpponentReady();
			setIsSwitching(true);
			setCurrentView('player');
		}
	};

	const handlePlayerReady = () => {
		setPlayerReady(true);
		setCurrentView('opponent');
	};

	const handleOpponentReady = () => {
		setOpponentReady(true);
		setCurrentView('player');
	};

	const handlePlayerAttack = () => {
		if (activePlayerPokemon.activeMove.pp === 0) return;
		const updatedPlayerActiveMove =
			activePlayerPokemon.activeMove.decreasePP();
		let updatedPlayerPokemon = activePlayerPokemon.changeActiveMove(
			updatedPlayerActiveMove
		);
		updatedPlayerPokemon = updatedPlayerPokemon.updateMoves();
		setActivePlayerPokemon(updatedPlayerPokemon);
		updatePlayerTeam(updatedPlayerPokemon);

		let notificationPlayerAttack = 0;
		addNotification({
			pokemonName: activePlayerPokemon.name,
			move: {
				name: activePlayerPokemon.activeMove.name,
				type: activePlayerPokemon.activeMove.type
			},
			userAvatar: {
				name: playerTeam.avatar.name,
				sprite: playerTeam.avatar.sprite
			},
			animationType: 'attack-opponent'
		});
		notificationPlayerAttack++;

		if (activePlayerPokemon.activeMove.target === 'user') {
			const updatedPokemon = activePlayerPokemon.attack(activePlayerPokemon);
			setActivePlayerPokemon(updatedPokemon);
			updatePlayerTeam(updatedPokemon);
		} else {
			setPreviousOpponentPokemonHp(activeOpponentPokemon.stats[0].value);
			const missChance = Math.random();
			if (missChance < activePlayerPokemon.activeMove.accuracy / 100) {
				const updatedOpponentPokemon = activePlayerPokemon.attack(
					activeOpponentPokemon
				);
				if (
					updatedOpponentPokemon.status.name !== '' &&
					updatedOpponentPokemon.status.name != 'KO'
				) {
					handleNotificationStatusEffect(
						updatedOpponentPokemon.status.name,
						updatedOpponentPokemon.name,
						opponentTeam.avatar
					);
					notificationPlayerAttack++;
				}

				setActiveOpponentPokemon(updatedOpponentPokemon);
				updateOpponentTeam(updatedOpponentPokemon);
				return { notificationPlayerAttack, updatedOpponentPokemon };
			} else {
				addNotification({
					pokemonName: activePlayerPokemon.name,
					userAvatar: {
						name: playerTeam.avatar.name,
						sprite: playerTeam.avatar.sprite
					},
					animationType: 'miss'
				});
				notificationPlayerAttack++;
				return {
					notificationPlayerAttack,
					updatedOpponentPokemon: activeOpponentPokemon
				};
			}
		}
	};

	const handleOpponentAttack = () => {
		let notificationOpponentAttack = 0;
		addNotification({
			pokemonName: activeOpponentPokemon.name,
			move: {
				name: activeOpponentPokemon.activeMove.name,
				type: activeOpponentPokemon.activeMove.type
			},
			userAvatar: {
				name: opponentTeam.avatar.name,
				sprite: opponentTeam.avatar.sprite
			},
			animationType: 'attack-player'
		});
		notificationOpponentAttack++;

		if (activeOpponentPokemon.activeMove.target === 'user') {
			const updatedPokemon = activeOpponentPokemon.attack(
				activeOpponentPokemon
			);
			setActiveOpponentPokemon(updatedPokemon);
			updateOpponentTeam(updatedPokemon);
		} else {
			setPreviousPlayerPokemonHp(activePlayerPokemon.stats[0].value);
			const missChance = Math.random();
			if (missChance < activeOpponentPokemon.activeMove.accuracy / 100) {
				const updatedPlayerPokemon =
					activeOpponentPokemon.attack(activePlayerPokemon);
				if (
					updatedPlayerPokemon.status.name !== '' &&
					updatedPlayerPokemon.status.name != 'KO'
				) {
					handleNotificationStatusEffect(
						updatedPlayerPokemon.status.name,
						updatedPlayerPokemon.name,
						playerTeam.avatar
					);
					notificationOpponentAttack++;
				}

				setActivePlayerPokemon(updatedPlayerPokemon);
				updatePlayerTeam(updatedPlayerPokemon);
				return { notificationOpponentAttack, updatedPlayerPokemon };
			} else {
				addNotification({
					pokemonName: activeOpponentPokemon.name,
					userAvatar: {
						name: opponentTeam.avatar.name,
						sprite: opponentTeam.avatar.sprite
					},
					animationType: 'miss'
				});
				notificationOpponentAttack++;
				return {
					notificationOpponentAttack,
					updatedPlayerPokemon: activePlayerPokemon
				};
			}
		}
	};

	const updatePlayerTeam = (updatedPokemon: Pokemon) => {
		const updatedPokemons = playerTeam.pokemons.map(pokemon =>
			pokemon.index === updatedPokemon.index ? updatedPokemon : pokemon
		);

		const updatedPlayerTeam = new Team(
			playerTeam.id,
			playerTeam.name,
			playerTeam.avatar,
			updatedPokemons
		);

		setPlayerTeam(updatedPlayerTeam);
	};

	const updateOpponentTeam = (updatedPokemon: Pokemon) => {
		const updatedPokemons = opponentTeam.pokemons.map(pokemon =>
			pokemon.index === updatedPokemon.index ? updatedPokemon : pokemon
		);

		const updatedOpponentTeam = new Team(
			opponentTeam.id,
			opponentTeam.name,
			opponentTeam.avatar,
			updatedPokemons
		);

		setOpponentTeam(updatedOpponentTeam);
	};

	const handleAttacksByPriority = () => {
		const playerSpeed = activePlayerPokemon.getStat('speed').value;
		const opponentSpeed = activeOpponentPokemon.getStat('speed').value;
		let nbNotificationsAttack = 0;

		if (playerSpeed > opponentSpeed) {
			if (!justSwitchedPlayer) {
				const { notificationPlayerAttack, updatedOpponentPokemon } =
					handlePlayerAttack();
				nbNotificationsAttack += notificationPlayerAttack;
				updatedOpponentPokemon.status.ableToMove
					? (nbNotificationsAttack +=
							handleOpponentAttack().notificationOpponentAttack)
					: null;
			} else {
				nbNotificationsAttack +=
					handleOpponentAttack().notificationOpponentAttack;
			}
		} else if (playerSpeed < opponentSpeed) {
			if (!justSwitchedOpponent) {
				const { notificationOpponentAttack, updatedPlayerPokemon } =
					handleOpponentAttack();
				nbNotificationsAttack += notificationOpponentAttack;
				updatedPlayerPokemon.status.ableToMove
					? (nbNotificationsAttack +=
							handlePlayerAttack().notificationPlayerAttack)
					: null;
			} else {
				nbNotificationsAttack +=
					handlePlayerAttack().notificationPlayerAttack;
			}
		} else {
			const random = Math.random();
			if (random > 0.5) {
				if (!justSwitchedPlayer) {
					const { notificationPlayerAttack, updatedOpponentPokemon } =
						handlePlayerAttack();
					nbNotificationsAttack += notificationPlayerAttack;
					updatedOpponentPokemon.status.ableToMove
						? (nbNotificationsAttack +=
								handleOpponentAttack().notificationOpponentAttack)
						: null;
				} else {
					nbNotificationsAttack +=
						handleOpponentAttack().notificationOpponentAttack;
				}
			} else {
				if (!justSwitchedOpponent) {
					const { notificationOpponentAttack, updatedPlayerPokemon } =
						handleOpponentAttack();
					nbNotificationsAttack += notificationOpponentAttack;
					updatedPlayerPokemon.status.ableToMove
						? (nbNotificationsAttack +=
								handlePlayerAttack().notificationPlayerAttack)
						: null;
				} else {
					nbNotificationsAttack +=
						handlePlayerAttack().notificationPlayerAttack;
				}
			}
		}

		return nbNotificationsAttack;
	};

	const handlePoisoning = (
		activePlayerPokemon: Pokemon,
		activeOpponentPokemon: Pokemon
	) => {
		let nbNotificationsPoison = 0;
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
				},
				animationType: 'status-suffer'
			});
			nbNotificationsPoison++;
		}

		if (activeOpponentPokemon.status.name === 'PSN') {
			const updatedPokemon = activeOpponentPokemon.sufferFromStatus();
			setActiveOpponentPokemon(updatedPokemon);
			addNotification({
				pokemonName: activeOpponentPokemon.name,
				statusEffect: {
					type: 'poison',
					name: 'suffers from poison'
				},
				userAvatar: {
					name: opponentTeam.avatar.name,
					sprite: opponentTeam.avatar.sprite
				},
				animationType: 'status-suffer'
			});
			nbNotificationsPoison++;
		}
		return nbNotificationsPoison;
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
					},
					animationType: 'status'
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
				},
				animationType: 'status'
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
					},
					animationType: 'status'
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
				},
				animationType: 'status'
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
			addNotification({
				pokemonName: activePlayerPokemon.name,
				statusEffect: {
					type: 'fire',
					name: 'suffer from burn'
				},
				userAvatar: {
					name: playerTeam.avatar.name,
					sprite: playerTeam.avatar.sprite
				},
				animationType: 'status'
			});
		}

		if (activeOpponentPokemon.status.name === 'BRN') {
			const updatedPokemon = activeOpponentPokemon.sufferFromStatus();
			setActiveOpponentPokemon(updatedPokemon);
			addNotification({
				pokemonName: activeOpponentPokemon.name,
				statusEffect: {
					type: 'fire',
					name: 'suffer from burn'
				},
				userAvatar: {
					name: opponentTeam.avatar.name,
					sprite: opponentTeam.avatar.sprite
				},
				animationType: 'status'
			});
		}
	};

	const handlePlayerKo = () => {
		if (activePlayerPokemon.stats[0].value === 0) {
			addNotification({
				pokemonName: activePlayerPokemon.name,
				userAvatar: {
					name: playerTeam.avatar.name,
					sprite: playerTeam.avatar.sprite
				},
				isKo: true,
				animationType: 'ko'
			});

			setCounterPlayerPokemonKo(counterPlayerPokemonKo + 1);
			setActivePlayerPokemonKo(true);
			setCurrentView('player');
		}
	};

	const handleOpponentKo = () => {
		if (activeOpponentPokemon.stats[0].value === 0) {
			addNotification({
				pokemonName: activeOpponentPokemon.name,
				userAvatar: {
					name: opponentTeam.avatar.name,
					sprite: opponentTeam.avatar.sprite
				},
				isKo: true,
				animationType: 'ko'
			});

			setCounterOpponentPokemonKo(counterOpponentPokemonKo + 1);
			setActiveOpponentPokemonKo(true);
			setCurrentView('opponent');
		}
	};

	const handleBattleEnd = () => {
		const playerTeamKo = playerTeam.pokemons.every(
			pokemon => pokemon.stats[0].value === 0
		);
		const opponentTeamKo = opponentTeam.pokemons.every(
			pokemon => pokemon.stats[0].value === 0
		);

		if (playerTeamKo || opponentTeamKo) {
			setBattleEnd(true);
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

	//Battle initialization
	useEffect(() => {
		if (!battle) return;
		const localStorageBattle = JSON.parse(localStorage.getItem('battle'));
		const parsedPlayerPokemon = localStorageBattle.activePlayerPokemon;

		const parsedOpponentPokemon = localStorageBattle.activeOpponentPokemon;

		const activePlayerPokemon =
			recreatePokemonFromParsed(parsedPlayerPokemon);
		const activeOpponentPokemon = recreatePokemonFromParsed(
			parsedOpponentPokemon
		);
		if (localStorageBattle) {
			setPlayerTeam(localStorageBattle.playerTeam);
			setOpponentTeam(localStorageBattle.opponentTeam);
			setActivePlayerPokemon(activePlayerPokemon);
			setActiveOpponentPokemon(activeOpponentPokemon);
			setActiveTurn(localStorageBattle.turn);
			setPreviousPlayerPokemonHp(activePlayerPokemon.stats[0].value);
			setPreviousOpponentPokemonHp(activeOpponentPokemon.stats[0].value);
			const playerPokemonKo = localStorageBattle.playerTeam.pokemons.every(
				(pokemon: Pokemon) => pokemon.stats[0].value === 0
			);
			const opponentPokemonKo =
				localStorageBattle.opponentTeam.pokemons.every(
					(pokemon: Pokemon) => pokemon.stats[0].value === 0
				);

			if (playerPokemonKo || opponentPokemonKo) {
				setBattleEnd(true);
			}
		} else if (battle) {
			setPlayerTeam(battle.playerTeam);
			setOpponentTeam(battle.opponentTeam);
			setActivePlayerPokemon(
				recreatePokemonFromParsed(battle.activePlayerPokemon)
			);
			setActiveOpponentPokemon(
				recreatePokemonFromParsed(battle.activeOpponentPokemon)
			);
			setPreviousPlayerPokemonHp(
				recreatePokemonFromParsed(battle.activePlayerPokemon).stats[0].value
			);
			setPreviousOpponentPokemonHp(
				recreatePokemonFromParsed(battle.activeOpponentPokemon).stats[0]
					.value
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

	//Sync battle to local storage
	useEffect(() => {
		if (!isInitialized) return;
		console.log('sync');
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

	//Turn sequence
	useEffect(() => {
		if (!playerReady || !opponentReady) return;

		const handleTurnSequence = async () => {
			handleSleeping(activePlayerPokemon, activeOpponentPokemon);
			handleConfusion(activePlayerPokemon, activeOpponentPokemon);
			handleParalysis(activePlayerPokemon, activeOpponentPokemon);
			const nbNotificationAttacks = handleAttacksByPriority();
			setBattleTurnEnd(true);
			setIsSwitching(false);
			setTimeout(() => {
				handleThawing(activePlayerPokemon, activeOpponentPokemon);
				const nbNotificationPoisons = handlePoisoning(
					activePlayerPokemon,
					activeOpponentPokemon
				);
				handleBurning(activePlayerPokemon, activeOpponentPokemon);

				setTimeout(
					() => {
						handlePlayerKo();
						handleOpponentKo();
					},
					nbNotificationAttacks * 2500 + nbNotificationPoisons * 2500
				);
			}, nbNotificationAttacks * 2500);

			setPlayerReady(false);
			setOpponentReady(false);
			setJustSwitchedPlayer(false);
			setJustSwitchedOpponent(false);
			setActiveTurn(activeTurn + 1);
			handleBattleEnd();
		};
		handleTurnSequence().then();
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

			{battleEnd && <BattleEnd playerTeam={playerTeam} />}

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

			<BattleToast
				currentNotification={currentNotification}
				battleTurnEnd={battleTurnEnd}
			/>

			{currentView === 'player' ? (
				<>
					<div className={'battle-team player'}>
						<BattleTeamCard
							team={playerTeam}
							activePokemon={activePlayerPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActivePlayerPokemon}
							handlePlayerReady={handlePlayerReady}
							handleOpponentReady={handleOpponentReady}
							player={true}
							currentView={currentView}
							setJustSwitched={setJustSwitchedPlayer}
							setPreviousHp={setPreviousPlayerPokemonHp}
							disabled={isNotificationActive}
						/>
					</div>

					<div className={'battle-team opponent'}>
						<BattleTeamCard
							team={opponentTeam}
							activePokemon={activeOpponentPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActiveOpponentPokemon}
							handlePlayerReady={handlePlayerReady}
							handleOpponentReady={handleOpponentReady}
							player={false}
							currentView={currentView}
							setJustSwitched={setJustSwitchedOpponent}
							setPreviousHp={setPreviousOpponentPokemonHp}
							disabled={isNotificationActive}
						/>
					</div>

					<div className={'battle-pokemon player'}>
						<BattlePokemonCard
							isSwitching={isSwitching}
							activePokemon={activePlayerPokemon}
							player={true}
							currentNotification={currentNotification}
							previousHp={previousPlayerPokemonHp}
							setPreviousHp={setPreviousPlayerPokemonHp}
							currentView={currentView}
						/>
					</div>

					<div className={'battle-pokemon opponent'}>
						<BattlePokemonCard
							isSwitching={isSwitching}
							activePokemon={activeOpponentPokemon}
							player={false}
							currentNotification={currentNotification}
							previousHp={previousOpponentPokemonHp}
							setPreviousHp={setPreviousOpponentPokemonHp}
							currentView={currentView}
						/>
					</div>

					<BattleActions
						playerPokemon={activePlayerPokemon}
						handleMoveSelection={handleMoveSelection}
						disabled={isNotificationActive}
					/>

					{!battleEnd && (
						<BattlePokemonKo
							activePokemon={activePlayerPokemon}
							setActivePokemon={setActivePlayerPokemon}
							team={playerTeam}
							setActivePokemonKo={setActivePlayerPokemonKo}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setCurrentView={setCurrentView}
							player={true}
							setPreviousHp={setPreviousPlayerPokemonHp}
							currentNotification={currentNotification}
						/>
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
							handlePlayerReady={handlePlayerReady}
							handleOpponentReady={handleOpponentReady}
							player={false}
							currentView={currentView}
							setJustSwitched={setJustSwitchedOpponent}
							setPreviousHp={setPreviousOpponentPokemonHp}
							disabled={isNotificationActive}
						/>
					</div>

					<div className={'battle-team opponent'}>
						<BattleTeamCard
							team={playerTeam}
							activePokemon={activePlayerPokemon}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setActivePokemon={setActivePlayerPokemon}
							handlePlayerReady={handlePlayerReady}
							handleOpponentReady={handleOpponentReady}
							player={true}
							currentView={currentView}
							setJustSwitched={setJustSwitchedPlayer}
							setPreviousHp={setPreviousPlayerPokemonHp}
							disabled={isNotificationActive}
						/>
					</div>

					<div className={'battle-pokemon player'}>
						<BattlePokemonCard
							isSwitching={isSwitching}
							activePokemon={activeOpponentPokemon}
							player={false}
							currentNotification={currentNotification}
							previousHp={previousOpponentPokemonHp}
							setPreviousHp={setPreviousOpponentPokemonHp}
							currentView={currentView}
						/>
					</div>

					<div className={'battle-pokemon opponent'}>
						<BattlePokemonCard
							isSwitching={isSwitching}
							activePokemon={activePlayerPokemon}
							player={true}
							currentNotification={currentNotification}
							previousHp={previousPlayerPokemonHp}
							setPreviousHp={setPreviousPlayerPokemonHp}
							currentView={currentView}
						/>
					</div>

					<BattleActions
						playerPokemon={activeOpponentPokemon}
						handleMoveSelection={handleMoveSelection}
						disabled={isNotificationActive}
					/>

					{!battleEnd && (
						<BattlePokemonKo
							activePokemon={activeOpponentPokemon}
							setActivePokemon={setActiveOpponentPokemon}
							team={opponentTeam}
							setActivePokemonKo={setActiveOpponentPokemonKo}
							recreatePokemonFromParsed={recreatePokemonFromParsed}
							setCurrentView={setCurrentView}
							player={false}
							setPreviousHp={setPreviousOpponentPokemonHp}
							currentNotification={currentNotification}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Battle;
