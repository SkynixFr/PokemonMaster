'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';

// Icons
import { Moon, Shield, Sun, Timer, Wind } from 'lucide-react';

// Components
import CustomImage from '../components/customImage';
import BattleTeam from '../components/battleTeam';
import BattePokemon from '../components/battlePokemon';

// Types
import BattleEffect from '../../types/BattleEffect';
import Pokemon from '../../types/Pokemon';

// POO
import PokemonClass from '../../classes/Pokemon';

const Battle = () => {
	// const dispatch = useDispatch();
	const teamOne = useSelector((state: RootState) => state.teams.teams[0]);
	const teamTwo = useSelector((state: RootState) => state.teams.teams[1]);
	const pikachu = new PokemonClass({
		pokemon: {
			id: 25,
			name: 'Bulbasaur',
			moves: [{
				name: 'Tackle',
				type: { name: 'normal' },
				category: 'physical',
				power: 40,
				accuracy: 100,
				pp: 35,
				description: 'A physical attack in which the user charges and slams into the target with its whole body.',
				effect: 'no effect',
			}],
		},
	});

	const [activePokemonTeamOne, setActivePokemonTeamOne] = useState<Pokemon>(
		teamOne.pokemons[0]
	);
	const [activePokemonTeamTwo, setActivePokemonTeamTwo] = useState<Pokemon>(
		teamTwo.pokemons[0]
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
			<div className="battle-turn">Turn 1</div>

			<div className="battle-toast">Toast</div>

			<div className="battle-global-infos">
				<Shield />
				<Wind />
			</div>

			<div className="battle-team player">
				<BattleTeam team={teamOne} />
			</div>

			<div className="battle-team opponent">
				<BattleTeam team={teamTwo} />
			</div>

			<div className="battle-pokemon player">
				<BattePokemon
					activePokemon={activePokemonTeamOne}
					battleEffects={battleEffectsTeamOne}
					player={true}
				/>
			</div>

			<div className="battle-pokemon opponent">
				<BattePokemon
					activePokemon={activePokemonTeamTwo}
					battleEffects={battleEffectsTeamTwo}
				/>
			</div>

			<div className="battle-actions">
				<button onClick={() => pikachu.attack()}>Attack</button>
				<button>Surrender</button>
				<button>Chat</button>
				<button>Team</button>
			</div>

			<div className="battle-timer">
				<button>
					<Timer />
				</button>
			</div>
		</div>
	);
};

export default Battle;
