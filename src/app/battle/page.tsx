'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';

// Icons
import { CloudRainWind } from 'lucide-react';

// Components
import CustomImage from '../components/customImage';
import BattleTeam from '../components/battleTeam';
import BattlePokemon from '../components/battlePokemon';
import CustomButton from '../components/customButton';

// Types
import BattleEffect from '../../types/BattleEffect';
import Pokemon from '../../types/Pokemon';

// POO
import PokemonClass from '../../classes/Pokemon';

const Battle = () => {
	// const dispatch = useDispatch();
	const teamOne = useSelector((state: RootState) => state.teams!.teams[0]);
	const teamTwo = useSelector((state: RootState) => state.teams!.teams[1]);
	const pikachu = new PokemonClass({
		pokemon: {
			id: 25,
			name: 'Bulbasaur',
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
		}
	});

	const [activePokemonTeamOne, setActivePokemonTeamOne] = useState<Pokemon>(
		teamOne?.pokemons[0]
	);
	const [activePokemonTeamTwo, setActivePokemonTeamTwo] = useState<Pokemon>(
		teamTwo?.pokemons[0]
	);
	const [battleEffectsTeamOne, setBattleEffectsTeamOne] = useState<
		BattleEffect[]
	>([
		{ name: 'BRU', type: 'status' },
		{ name: 'Atk', number: 0.67, type: 'debuff' },
		{ name: 'PAR', type: 'status' }
	]);
	const [battleEffectsTeamTwo, setBattleEffectsTeamTwo] = useState<
		BattleEffect[]
	>([{ name: 'SpD', number: 1.5, type: 'buff' }]);

	const [globalEffect, setGlobalEffect] = useState<BattleEffect[]>([
		{ name: 'Rain', turns: 5 }
	]);

	const [theme, setTheme] = useState<string>('day');
	const toggleTheme = () => {
		setTheme(theme === 'day' ? 'night' : 'day');
	};

	if (!teamOne || !teamTwo || !activePokemonTeamOne || !activePokemonTeamTwo) {
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
				<BattleTeam team={teamOne} />
			</div>

			<div className="battle-team opponent">
				<BattleTeam team={teamTwo} />
			</div>

			<div className="battle-pokemon player">
				<BattlePokemon
					activePokemon={activePokemonTeamOne}
					battleEffects={battleEffectsTeamOne}
					player={true}
				/>
			</div>

			<div className="battle-pokemon opponent">
				<BattlePokemon
					activePokemon={activePokemonTeamTwo}
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
						onClick={() => pikachu.attack()}
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
