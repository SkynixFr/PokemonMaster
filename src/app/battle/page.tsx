'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Classes
import PokemonClass from '../../back/classes/pokemon';
import BattleClass from '../../back/classes/battle';

// Interfaces
interface BattleProps {
	battle: BattleClass;
}

const Battle = ({ battle }: BattleProps) => {
	const [playerPokemon, setPlayerPokemon] = useState<PokemonClass | null>();
	const [opponentPokemon, setOpponentPokemon] =
		useState<PokemonClass | null>();

	useEffect(() => {
		if (!battle) return;
		setPlayerPokemon(battle.playerPokemon);
		setOpponentPokemon(battle.opponentPokemon);
	}, [battle]);

	if (!battle || !playerPokemon || !opponentPokemon) {
		console.log('Battle loading...');
		return <div>Loading...</div>;
	}

	const handlePlayerAttack = () => {
		const updatedOpponentPokemon = playerPokemon.attack(
			opponentPokemon,
			playerPokemon.moves[0]
		);
		setOpponentPokemon(updatedOpponentPokemon);
		localStorage.setItem(
			'opponentPokemon',
			JSON.stringify(updatedOpponentPokemon)
		);
	};

	const handlePlayerHeal = () => {
		const updatedPlayerPokemon = playerPokemon.heal();
		setPlayerPokemon(updatedPlayerPokemon);
		localStorage.setItem(
			'playerPokemon',
			JSON.stringify(updatedPlayerPokemon)
		);
		return;
	};

	const handleOpponentAttack = () => {
		const updatedPlayerPokemon = opponentPokemon.attack(
			playerPokemon,
			opponentPokemon.moves[0]
		);
		setPlayerPokemon(updatedPlayerPokemon);
		localStorage.setItem(
			'playerPokemon',
			JSON.stringify(updatedPlayerPokemon)
		);
	};

	const handleOpponentHeal = () => {
		const updatedOpponentPokemon = opponentPokemon.heal();
		setOpponentPokemon(updatedOpponentPokemon);
		localStorage.setItem(
			'playerPokemon',
			JSON.stringify(updatedOpponentPokemon)
		);
	};

	return (
		<div>
			<Link href={'/rooms'}>Go back</Link>
			<h1>Battle</h1>
			<p>
				<span>Opponent : </span>
				{opponentPokemon.name + ' '}
				{opponentPokemon.status.name !== 'KO'
					? opponentPokemon.getStat('hp').value +
						'/' +
						opponentPokemon.getStat('hp').max
					: opponentPokemon.status.name}
			</p>

			<button onClick={handleOpponentAttack}>Attack</button>
			<button onClick={handleOpponentHeal}>Heal</button>
			<p>
				<span>Player : </span>
				{playerPokemon.name + ' '}
				{playerPokemon.status.name !== 'KO'
					? playerPokemon.getStat('hp').value +
						'/' +
						playerPokemon.getStat('hp').max
					: playerPokemon.status.name}
			</p>
			<button onClick={handlePlayerAttack}>Attack</button>
			<button onClick={handlePlayerHeal}>Heal</button>
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
