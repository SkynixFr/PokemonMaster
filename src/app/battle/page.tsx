'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';

// Icons
import { CloudRainWind } from 'lucide-react';

// Components
import CustomImage from '../components/customImage';
import BattleTeam from '../components/battleTeam';
import BattlePokemon from '../components/battlePokemon';
import CustomButton from '../components/customButton';

// Types
import BattleEffect from '../../types/BattleEffect';

// POO
import PokemonClass from '../../classes/Pokemon';
import BattleClass from '../../classes/Battle';
import TeamClass from '../../classes/Team';
import StatsClass from '../../classes/Stats';
import {
	setBattle,
	setGuestActivePokemon
} from '../store/features/battleSlice';

const Battle = () => {
	const dispatch = useDispatch();
	const hostTeam = useSelector(
		(state: RootState) => state.battleSlice.hostTeam
	);
	const guestTeam = useSelector(
		(state: RootState) => state.battleSlice.guestTeam
	);

	const [hostTeamBattleEffects, setBattleEffectsTeamOne] = useState<
		BattleEffect[]
	>([
		{ name: 'BRU', type: 'status' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'Atk', number: 0.67, type: 'debuff' }
	]);
	const [guestTeamBattleEffects, setBattleEffectsTeamTwo] = useState<
		BattleEffect[]
	>([
		{ name: 'SpD', number: 1.5, type: 'buff' },
		{ name: 'PAR', type: 'status' }
	]);
	const [globalEffect, setGlobalEffect] = useState<BattleEffect[]>([
		{ name: 'Rain', turns: 5 }
	]);

	const [theme, setTheme] = useState<string>('day');
	const toggleTheme = () => {
		setTheme(theme === 'day' ? 'night' : 'day');
	};

	useEffect(() => {
		const stats = new StatsClass({
			hp: 45,
			attack: 49,
			defense: 49,
			spAttack: 65,
			spDefense: 65,
			speed: 45,
			ev: 0,
			iv: 0,
			currentHp: 45
		});

		const bulbasaur = new PokemonClass({
			id: 1,
			name: 'Bulbasaur',
			stats,
			moves: [
				{
					name: 'Tackle',
					type: { name: 'normal' },
					category: 'physical',
					power: 40,
					accuracy: 100,
					pp: 35,
					description:
						'A physical attack in which the user charges and slams into the target with its whole body.',
					effect: 'no effect'
				}
			]
		});
		const squirtle = new PokemonClass({
			id: 7,
			name: 'Squirtle',
			stats,
			moves: [
				{
					name: 'Tackle',
					type: { name: 'normal' },
					category: 'physical',
					power: 40,
					accuracy: 100,
					pp: 35,
					description:
						'A physical attack in which the user charges and slams into the target with its whole body.',
					effect: 'no effect'
				}
			]
		});

		const charmander = new PokemonClass({
			id: 4,
			name: 'Charmander',
			stats,
			moves: [
				{
					name: 'Tackle',
					type: { name: 'normal' },
					category: 'physical',
					power: 40,
					accuracy: 100,
					pp: 35,
					description:
						'A physical attack in which the user charges and slams into the target with its whole body.',
					effect: 'no effect'
				}
			]
		});

		const mew = new PokemonClass({
			id: 151,
			name: 'Mew',
			stats,
			moves: [
				{
					name: 'Tackle',
					type: { name: 'normal' },
					category: 'physical',
					power: 40,
					accuracy: 100,
					pp: 35,
					description:
						'A physical attack in which the user charges and slams into the target with its whole body.',
					effect: 'no effect'
				}
			]
		});

		const arcanine = new PokemonClass({
			id: 59,
			name: 'Arcanine',
			stats,
			moves: [
				{
					name: 'Tackle',
					type: { name: 'normal' },
					category: 'physical',
					power: 40,
					accuracy: 100,
					pp: 35,
					description:
						'A physical attack in which the user charges and slams into the target with its whole body.',
					effect: 'no effect'
				}
			]
		});

		const ninetails = new PokemonClass({
			id: 38,
			name: 'Ninetails',
			stats,
			moves: [
				{
					name: 'Tackle',
					type: { name: 'normal' },
					category: 'physical',
					power: 40,
					accuracy: 100,
					pp: 35,
					description:
						'A physical attack in which the user charges and slams into the target with its whole body.',
					effect: 'no effect'
				}
			]
		});

		const hostTeam = new TeamClass({
			name: 'Host',
			avatar: '/images/avatars/cynthia.png',
			pokemons: [bulbasaur, squirtle, charmander, mew, arcanine, ninetails],
			activePokemon: bulbasaur
		});

		const guestTeam = new TeamClass({
			name: 'Guest',
			avatar: '/images/avatars/red.png',
			pokemons: [squirtle, charmander, bulbasaur, ninetails, mew, arcanine],
			activePokemon: squirtle
		});

		const battle = new BattleClass(hostTeam, guestTeam, 1);

		dispatch(setBattle(battle));
	}, []);

	useEffect(() => {}, [guestTeam.activePokemon]);

	if (
		!guestTeam ||
		!hostTeam ||
		!hostTeam.activePokemon ||
		!guestTeam.activePokemon
	) {
		return <div>Loading...</div>;
	}

	const handleAttack = () => {
		const updatedHp = hostTeam.activePokemon.attack(
			guestTeam.activePokemon,
			hostTeam.activePokemon.moves[0]
		);
		const updatedGuestPokemon = {
			...guestTeam.activePokemon,
			stats: { ...guestTeam.activePokemon.stats, currentHp: updatedHp }
		};
		dispatch(setGuestActivePokemon(updatedGuestPokemon));
	};

	return (
		<div className="battle-container">
			<CustomImage
				src={`/images/backgrounds/bg-battle-${theme}-upscale-tiny.jpg`}
				alt="Battle background"
				fill={true}
				priority={true}
				objectFit="cover"
				className="battle-background"
			/>
			<div className="battle-theme">
				<CustomButton
					icon={
						theme === 'day'
							? { name: 'Moon', size: 20 }
							: { name: 'Sun', size: 20 }
					}
					onClick={toggleTheme}
					className="theme-icon"
				/>
			</div>
			<div className="battle-turn">Turn 1</div>

			<div className="battle-toast">Toast</div>

			<div className="battle-global-infos">
				{globalEffect &&
					globalEffect.map(effect => (
						<>
							{effect.name === 'Rain' && (
								<div className="rain" key={effect.name}>
									<CloudRainWind size={20} />
									<span>{effect.turns}</span>
								</div>
							)}
						</>
					))}
			</div>

			<div className="battle-team player">
				<BattleTeam team={hostTeam} />
			</div>

			<div className="battle-team opponent">
				<BattleTeam team={guestTeam} />
			</div>

			<div className="battle-pokemon player">
				<BattlePokemon
					activePokemon={hostTeam.activePokemon}
					battleEffects={hostTeamBattleEffects}
					player={true}
				/>
			</div>

			<div className="battle-pokemon opponent">
				<BattlePokemon
					activePokemon={guestTeam.activePokemon}
					battleEffects={guestTeamBattleEffects}
				/>
			</div>

			<div className="battle-actions">
				<div>
					<CustomButton
						text="Attack"
						image={{
							src: '/images/icons/battle.png',
							alt: 'Battle icon',
							width: 75,
							height: 75,
							priority: true,
							className: 'battle-icon'
						}}
						onClick={() => {
							handleAttack();
							// setCurrentHp(
							// 	hostTeam
							// 		.getActivePokemon()
							// 		.attack(
							// 			guestTeam.getActivePokemon(),
							// 			hostTeam.getActivePokemon().moves[0]
							// 		)
							// );
							// guestTeam.getActivePokemon().stats.currentHp = currentHp;
							// console.log(
							// 	'guest:',
							// 	guestTeam.getActivePokemon().stats.currentHp
							// );
							// console.log(
							// 	'host:',
							// 	hostTeam.getActivePokemon().stats.currentHp
							// );
						}}
					/>
					<CustomButton
						text="Team"
						image={{
							src: '/images/icons/pokeball.png',
							alt: 'Battle icon',
							width: 75,
							height: 75,
							priority: true,
							className: 'battle-icon'
						}}
					/>
					<CustomButton
						text="Chat"
						image={{
							src: '/images/icons/chat.png',
							alt: 'Battle icon',
							width: 75,
							height: 75,
							priority: true,
							className: 'battle-icon'
						}}
					/>
					<CustomButton
						text="Surrender"
						image={{
							src: '/images/icons/run.png',
							alt: 'Battle icon',
							width: 75,
							height: 75,
							priority: true,
							className: 'battle-icon run'
						}}
					/>
				</div>
			</div>

			<div className="battle-timer">
				<CustomButton
					icon={{
						name: 'Timer',
						size: 20,
						strokeWidth: 3
					}}
					text="Start the timer"
					className="timer-icon"
				/>
			</div>
		</div>
	);
};

export default Battle;
