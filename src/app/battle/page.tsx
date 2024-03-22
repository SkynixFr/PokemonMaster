'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

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
			<div className={`battle-background ${theme}`}>
				<Image
					src={
						theme === 'day'
							? `/images/backgrounds/bg-battle-day-upscale.jpg`
							: `/images/backgrounds/bg-battle-night-upscale.jpg`
					}
					alt="Battle Background"
					fill={true}
					priority={true}
					objectFit="cover"
					className="battle-background-image"
				/>
			</div>

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
