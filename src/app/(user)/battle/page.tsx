'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
	const [playerMultiTurnAttack, setPlayerMultiTurnAttack] =
		useState<boolean>(false);
	const [opponentMultiTurnAttack, setOpponentMultiTurnAttack] =
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
		if (playerSleepCounter === 0) {
			setPlayerPokemon(playerPokemon?.changeStatus(new Status('', '')));
		}
		if (opponentSleepCounter === 0) {
			setOpponentPokemon(opponentPokemon?.changeStatus(new Status('', '')));
		}
	}, [playerSleepCounter, opponentSleepCounter]);

	// Reset du status freeze avec une chance de 20%
	useEffect(() => {
		if (
			playerPokemon?.status.name === 'FRZ' &&
			playerThawChance < THAW_CHANCE
		) {
			setPlayerPokemon(playerPokemon.changeStatus(new Status('', '')));
		}
		if (
			opponentPokemon?.status.name === 'FRZ' &&
			opponentThawChance < THAW_CHANCE
		) {
			setOpponentPokemon(opponentPokemon.changeStatus(new Status('', '')));
		}
	}, [playerThawChance, opponentThawChance]);

	// Déroulement d'un tour de jeu
	useEffect(() => {
		if (!playerReady || !opponentReady) return;
		handleSleepStatus();
		handleFreezeStatus();
		handleAttacksByPriority();
		setPlayerReady(false);
		setOpponentReady(false);
	}, [playerReady, opponentReady]);

	// Détermination du gagnant
	useEffect(() => {
		if (playerPokemon?.status.name === 'KO') {
			setBattleWinner('Opponent');
		}
		if (opponentPokemon?.status.name === 'KO') {
			setBattleWinner('Player');
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
	};

	// Gestion du move du joueur
	const handlePlayerAttack = () => {
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

	return (
		<div style={{ margin: '100px 0 0 10px' }}>
			{/* Affichage des informations du Pokemon de l'adversaire */}
			<p>
				<span>Opponent : </span>
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
				<span>Player : </span>
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
			{battleWinner && <h1>{battleWinner} wins!!!</h1>}
		</div>
	);
};
export default Battle;

// 'use client';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { useEffect, useState } from 'react';
//
// // Icons
// import { CloudRainWind, Timer } from 'lucide-react';
//
// // Components
// import CustomImage from '../components/customImage';
// import BattleTeam from '../components/battleTeam';
// import BattlePokemon from '../components/battlePokemon';
// import CustomButton from '../components/customButton';
//
// // Types
// import BattleEffect from '../../types/BattleEffect';
//
// // POO
// import PokemonClass from '../../classes/Pokemon';
// import BattleClass from '../../classes/Battle';
// import TeamClass from '../../classes/Team';
// import StatsClass from '../../classes/Stats';
//
// const Battle = () => {
// 	const [hostTeam, setHostTeam] = useState<TeamClass | null>(null);
// 	const [guestTeam, setGuestTeam] = useState<TeamClass | null>(null);
// 	const [currentHp, setCurrentHp] = useState<number>(guestTeam?.getActivePokemon().stats.currentHp);
// 	const [hostTeamBattleEffects, setBattleEffectsTeamOne] = useState<
// 		BattleEffect[]
// 	>([
// 		{ name: 'BRU', type: 'status' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' },
// 		{ name: 'Atk', number: 0.67, type: 'debuff' }
// 	]);
// 	const [guestTeamBattleEffects, setBattleEffectsTeamTwo] = useState<
// 		BattleEffect[]
// 	>([
// 		{ name: 'SpD', number: 1.5, type: 'buff' },
// 		{ name: 'PAR', type: 'status' }
// 	]);
// 	const [globalEffect, setGlobalEffect] = useState<BattleEffect[]>([
// 		{ name: 'Rain', turns: 5 }
// 	]);
//
// 	const [theme, setTheme] = useState<string>('day');
// 	const toggleTheme = () => {
// 		setTheme(theme === 'day' ? 'night' : 'day');
// 	};
//
// 	useEffect(() => {
//
// 		const stats = new StatsClass({
// 			hp: 45,
// 			attack: 49,
// 			defense: 49,
// 			spAttack: 65,
// 			spDefense: 65,
// 			speed: 45,
// 			ev: 0,
// 			iv: 0,
// 			currentHp: 45
// 		});
//
// 		const bulbasaur = new PokemonClass({
// 			id: 1,
// 			name: 'Bulbasaur',
// 			stats,
// 			moves: [
// 				{
// 					name: 'Tackle',
// 					type: { name: 'normal' },
// 					category: 'physical',
// 					power: 40,
// 					accuracy: 100,
// 					pp: 35,
// 					description:
// 						'A physical attack in which the user charges and slams into the target with its whole body.',
// 					effect: 'no effect'
// 				}
// 			]
// 		});
// 		const squirtle = new PokemonClass({
// 			id: 7,
// 			name: 'Squirtle',
// 			stats,
// 			moves: [
// 				{
// 					name: 'Tackle',
// 					type: { name: 'normal' },
// 					category: 'physical',
// 					power: 40,
// 					accuracy: 100,
// 					pp: 35,
// 					description:
// 						'A physical attack in which the user charges and slams into the target with its whole body.',
// 					effect: 'no effect'
// 				}
// 			]
// 		});
//
// 		const charmander = new PokemonClass({
// 			id: 4,
// 			name: 'Charmander',
// 			stats,
// 			moves: [
// 				{
// 					name: 'Tackle',
// 					type: { name: 'normal' },
// 					category: 'physical',
// 					power: 40,
// 					accuracy: 100,
// 					pp: 35,
// 					description:
// 						'A physical attack in which the user charges and slams into the target with its whole body.',
// 					effect: 'no effect'
// 				}
// 			]
// 		});
//
// 		const mew = new PokemonClass({
// 			id: 151,
// 			name: 'Mew',
// 			stats,
// 			moves: [
// 				{
// 					name: 'Tackle',
// 					type: { name: 'normal' },
// 					category: 'physical',
// 					power: 40,
// 					accuracy: 100,
// 					pp: 35,
// 					description:
// 						'A physical attack in which the user charges and slams into the target with its whole body.',
// 					effect: 'no effect'
// 				}
// 			]
// 		});
//
// 		const arcanine = new PokemonClass({
// 			id: 59,
// 			name: 'Arcanine',
// 			stats,
// 			moves: [
// 				{
// 					name: 'Tackle',
// 					type: { name: 'normal' },
// 					category: 'physical',
// 					power: 40,
// 					accuracy: 100,
// 					pp: 35,
// 					description:
// 						'A physical attack in which the user charges and slams into the target with its whole body.',
// 					effect: 'no effect'
// 				}
// 			]
// 		});
//
// 		const ninetails = new PokemonClass({
// 			id: 38,
// 			name: 'Ninetails',
// 			stats,
// 			moves: [
// 				{
// 					name: 'Tackle',
// 					type: { name: 'normal' },
// 					category: 'physical',
// 					power: 40,
// 					accuracy: 100,
// 					pp: 35,
// 					description:
// 						'A physical attack in which the user charges and slams into the target with its whole body.',
// 					effect: 'no effect'
// 				}
// 			]
// 		});
//
// 		const hostTeam = new TeamClass(
// 			{
// 				name: 'Host',
// 				avatar: '/images/avatars/cynthia.png',
// 				pokemons: [bulbasaur, squirtle, charmander, mew, arcanine, ninetails]
// 			},
// 			bulbasaur
// 		);
//
// 		setHostTeam(hostTeam);
//
// 		const guestTeam = new TeamClass(
// 			{
// 				name: 'Guest',
// 				avatar: '/images/avatars/red.png',
// 				pokemons: [squirtle, charmander, bulbasaur, ninetails, mew, arcanine]
// 			},
// 			squirtle
// 		);
//
// 		setGuestTeam(guestTeam);
//
// 		console.log(guestTeam.getActivePokemon());
//
// 		const battle = new BattleClass(hostTeam, guestTeam, 1);
// 	}, []);
//
// 	if (
// 		!guestTeam ||
// 		!hostTeam ||
// 		!guestTeam.getActivePokemon() ||
// 		!hostTeam.getActivePokemon()
// 	) {
// 		return <div>Loading...</div>;
// 	}
//
// 	return (
// 		<div className="battle-container">
// 			<CustomImage
// 				src={`/images/backgrounds/bg-battle-${theme}-upscale-tiny.jpg`}
// 				alt="Battle background"
// 				fill={true}
// 				priority={true}
// 				objectFit="cover"
// 				className="battle-background"
// 			/>
// 			<div className="battle-theme">
// 				<CustomButton
// 					icon={
// 						theme === 'day'
// 							? { name: 'Moon', size: 20 }
// 							: { name: 'Sun', size: 20 }
// 					}
// 					onClick={toggleTheme}
// 					className="theme-icon"
// 				/>
// 			</div>
// 			<div className="battle-turn">Turn 1</div>
//
// 			<div className="battle-toast">Toast</div>
//
// 			<div className="battle-global-infos">
// 				{globalEffect &&
// 					globalEffect.map(effect => (
// 						<>
// 							{effect.name === 'Rain' && (
// 								<div className="rain" key={effect.name}>
// 									<CloudRainWind size={20} />
// 									<span>{effect.turns}</span>
// 								</div>
// 							)}
// 						</>
// 					))}
// 			</div>
//
// 			<div className="battle-team player">
// 				<BattleTeam team={hostTeam} />
// 			</div>
//
// 			<div className="battle-team opponent">
// 				<BattleTeam team={guestTeam} />
// 			</div>
//
// 			<div className="battle-pokemon player">
// 				<BattlePokemon
// 					activePokemon={hostTeam.getActivePokemon()}
// 					battleEffects={hostTeamBattleEffects}
// 					player={true}
// 				/>
// 			</div>
//
// 			<div className="battle-pokemon opponent">
// 				<BattlePokemon
// 					activePokemon={guestTeam.getActivePokemon()}
// 					battleEffects={guestTeamBattleEffects}
// 				/>
// 			</div>
//
// 			<div className="battle-actions">
// 				<div>
// 					<CustomButton
// 						text="Attack"
// 						image={{
// 							src: '/images/icons/battle.png',
// 							alt: 'Battle icon',
// 							width: 75,
// 							height: 75,
// 							priority: true,
// 							className: 'battle-icon'
// 						}}
// 						onClick={() => {setCurrentHp(hostTeam.getActivePokemon().attack(guestTeam.getActivePokemon(), hostTeam.getActivePokemon().moves[0]))
// 						guestTeam.getActivePokemon().stats.currentHp = currentHp;
// 						console.log('guest:', guestTeam.getActivePokemon().stats.currentHp)
// 						console.log('host:', hostTeam.getActivePokemon().stats.currentHp)
// 					}}
// 					/>
// 					<CustomButton
// 						text="Team"
// 						image={{
// 							src: '/images/icons/pokeball.png',
// 							alt: 'Battle icon',
// 							width: 75,
// 							height: 75,
// 							priority: true,
// 							className: 'battle-icon'
// 						}}
// 					/>
// 					<CustomButton
// 						text="Chat"
// 						image={{
// 							src: '/images/icons/chat.png',
// 							alt: 'Battle icon',
// 							width: 75,
// 							height: 75,
// 							priority: true,
// 							className: 'battle-icon'
// 						}}
// 					/>
// 					<CustomButton
// 						text="Surrender"
// 						image={{
// 							src: '/images/icons/run.png',
// 							alt: 'Battle icon',
// 							width: 75,
// 							height: 75,
// 							priority: true,
// 							className: 'battle-icon run'
// 						}}
// 					/>
// 				</div>
// 			</div>
//
// 			<div className="battle-timer">
// 				<CustomButton
// 					icon={{
// 						name: 'Timer',
// 						size: 20,
// 						strokeWidth: 3
// 					}}
// 					text="Start the timer"
// 					className="timer-icon"
// 				/>
// 			</div>
// 		</div>
// 	);
// };
//
// export default Battle;
