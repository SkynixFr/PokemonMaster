import React, { useEffect, useState } from 'react';

// Classes
import Pokemon from '../../../back/classes/pokemon';
import Team from '../../../back/classes/team';

// Components
import CustomImage from '../customImage';
import BattleSwitching from './battleSwitch';

// Interfaces
interface TeamCardProps {
	team: Team;
	activePokemon: Pokemon;
	setActivePokemon: (pokemon: Pokemon) => void;
	recreatePokemonFromParsed: (pokemon: Pokemon) => Pokemon;
	player: boolean;
	currentView: string;
}

const BattleTeamCard = ({
	team,
	activePokemon,
	setActivePokemon,
	recreatePokemonFromParsed,
	player,
	currentView
}: TeamCardProps) => {
	const [isSwitching, setIsSwitching] = useState(false);
	const [isSwitchingTo, setIsSwitchingTo] = useState<Pokemon | null>(null);

	const handleSwitchPokemon = (pokemon: Pokemon) => {
		if (pokemon.stats[0].value === 0) return;
		const newPokemon = recreatePokemonFromParsed(pokemon);
		setActivePokemon(newPokemon);
		setIsSwitching(false);
		setIsSwitchingTo(null);
	};

	const handleSwitching = (pokemon: Pokemon) => {
		if (pokemon.stats[0].value === 0) return;
		setIsSwitching(true);
		setIsSwitchingTo(pokemon);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsSwitching(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setIsSwitching]);

	return (
		<>
			<div
				className={`battle-team-container ${player ? 'player' : 'opponent'}`}
			>
				<div className={`battle-team-avatar`}>
					<CustomImage
						src={team.avatar.sprite}
						alt={`avatar-player-${team.avatar.name}`}
						width={150}
						height={250}
					/>
				</div>
				<div className={'battle-team-infos'}>
					<h2>{team.name}</h2>
					<div className={'battle-team-pokemons'}>
						{team.pokemons.map((pokemon: Pokemon) => (
							<div
								key={pokemon.name}
								className={`battle-team-pokemon ${
									pokemon.name === activePokemon.name ? 'active' : ''
								} ${pokemon.stats[0].value === 0 ? 'ko' : ''}`}
								onClick={() =>
									((currentView === 'player' && player) ||
										(currentView === 'opponent' && !player)) &&
									handleSwitching(pokemon)
								}
							>
								<CustomImage
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.pokedexId}.gif`}
									alt={pokemon.name}
									width={40}
									height={40}
									unoptimized={true}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			{isSwitching && (
				<BattleSwitching
					setIsSwitching={setIsSwitching}
					isSwitchingTo={isSwitchingTo}
					handleSwitchPokemon={handleSwitchPokemon}
				/>
			)}
		</>
	);
};

export default BattleTeamCard;
