'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import CustomImage from '../components/customImage';

const Battle = () => {
	const dispatch = useDispatch();
	const teamOne = useSelector((state: RootState) => state.teams.teams[0]);
	const teamTwo = useSelector((state: RootState) => state.teams.teams[1]);

	const [theme, setTheme] = useState('day');

	const toggleTheme = () => {
		setTheme(theme === 'day' ? 'night' : 'day');
	};

	return (
		<div className="battle-container">
			<CustomImage
				src={`/images/backgrounds/bg-battle-${theme}-upscale.jpg`}
				alt="Battle background"
				priority={true}
				className="battle-background"
			/>
			<div className="theme-btn" onClick={toggleTheme}>
				{theme === 'day' ? <Moon /> : <Sun />}
			</div>
			<div className="battle-teams">
				<div className="battle-team">
					<h2>Team One</h2>
					<ul>
						{teamOne &&
							teamOne.pokemons.map(pokemon => (
								<li key={pokemon.id}>{pokemon.name}</li>
							))}
					</ul>
				</div>
				<div className="battle-team">
					<h2>Team Two</h2>
					<ul>
						{teamTwo &&
							teamTwo.pokemons.map(pokemon => (
								<li key={pokemon.id}>{pokemon.name}</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Battle;
