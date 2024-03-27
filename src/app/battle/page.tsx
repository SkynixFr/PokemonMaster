'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';

// Icons
import { CloudRainWind, Timer } from 'lucide-react';

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

const Battle = () => {
	const [hostTeam, setHostTeam] = useState<TeamClass | null>(null);
	const [guestTeam, setGuestTeam] = useState<TeamClass | null>(null);
	const [battleEffectsTeamOne, setBattleEffectsTeamOne] = useState<
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
	const [battleEffectsTeamTwo, setBattleEffectsTeamTwo] = useState<
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
		const bulbasaur = new PokemonClass({
			id: 1,
			name: 'Bulbasaur',
			stats: {
				hp: 45,
				attack: 49,
				defense: 49,
				spAttack: 65,
				spDefense: 65,
				speed: 45,
				ev: 0,
				iv: 0,
				currentHp: 45
			},
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
			stats: {
				hp: 44,
				attack: 48,
				defense: 65,
				spAttack: 50,
				spDefense: 64,
				speed: 43,
				ev: 0,
				iv: 0,
				currentHp: 44
			},
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
			stats: {
				hp: 39,
				attack: 52,
				defense: 43,
				spAttack: 60,
				spDefense: 50,
				speed: 65,
				ev: 0,
				iv: 0,
				currentHp: 39
			},
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
			stats: {
				hp: 100,
				attack: 100,
				defense: 100,
				spAttack: 100,
				spDefense: 100,
				speed: 100,
				ev: 0,
				iv: 0,
				currentHp: 100
			},
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
			stats: {
				hp: 90,
				attack: 110,
				defense: 80,
				spAttack: 100,
				spDefense: 80,
				speed: 95,
				ev: 0,
				iv: 0,
				currentHp: 90
			},
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
			stats: {
				hp: 73,
				attack: 76,
				defense: 75,
				spAttack: 81,
				spDefense: 100,
				speed: 100,
				ev: 0,
				iv: 0,
				currentHp: 73
			},
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
			
		const hostTeam = new TeamClass(
			{
				name: 'Host',
				avatar: '/images/avatars/cynthia.png',
				pokemons: [bulbasaur, squirtle, charmander, mew, arcanine, ninetails]
			},
			bulbasaur
		);

		setHostTeam(hostTeam);

		const guestTeam = new TeamClass(
			{
				name: 'Guest',
				avatar: '/images/avatars/red.png',
				pokemons: [squirtle, charmander, bulbasaur, ninetails, mew, arcanine]
			},
			squirtle
		);

		setGuestTeam(guestTeam);

		console.log(guestTeam.getActivePokemon());

		const battle = new BattleClass(hostTeam, guestTeam, 1);
	}, []);

	if (
		!guestTeam ||
		!hostTeam ||
		!guestTeam.getActivePokemon() ||
		!hostTeam.getActivePokemon()
	) {
		return <div>Loading...</div>;
	}

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
					activePokemon={hostTeam.getActivePokemon()}
					battleEffects={battleEffectsTeamOne}
					player={true}
				/>
			</div>

			<div className="battle-pokemon opponent">
				<BattlePokemon
					activePokemon={guestTeam.getActivePokemon()}
					battleEffects={battleEffectsTeamTwo}
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
						onClick={() => hostTeam.getActivePokemon().attack(guestTeam.getActivePokemon(), hostTeam.getActivePokemon().moves[0])}
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
