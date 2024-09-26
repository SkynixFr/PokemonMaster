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
	handlePlayerReady: () => void;
	handleOpponentReady: () => void;
	player: boolean;
	currentView: string;
	setJustSwitched: (justSwitched: boolean) => void;
	setPreviousHp: (hp: number) => void;
	disabled: boolean;
	setOpenModalMoves?: (value: boolean) => void;
}

const BattleTeamCard = ({
	team,
	activePokemon,
	setActivePokemon,
	recreatePokemonFromParsed,
	handlePlayerReady,
	handleOpponentReady,
	player,
	currentView,
	setJustSwitched,
	setPreviousHp,
	disabled,
	setOpenModalMoves
}: TeamCardProps) => {
	const [isSwitching, setIsSwitching] = useState(false);
	const [isSwitchingTo, setIsSwitchingTo] = useState<Pokemon | null>(null);

	const handleSwitchPokemon = (pokemon: Pokemon) => {
		if (pokemon.status.name === 'KO') return;
		const newPokemon = recreatePokemonFromParsed(pokemon);
		setActivePokemon(newPokemon);
		player ? handlePlayerReady() : handleOpponentReady();
		setPreviousHp(newPokemon.stats[0].value);
		setIsSwitching(false);
		setIsSwitchingTo(null);
		setJustSwitched(true);
	};

	const handleSwitching = (pokemon: Pokemon) => {
		if (pokemon.stats[0].value === 0) return;
		setIsSwitching(true);
		setIsSwitchingTo(pokemon);
		setOpenModalMoves(false);
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
								} ${pokemon.stats[0].value === 0 ? 'ko' : ''} ${player && disabled ? 'disabled' : ''} ${player && currentView === 'player' ? 'clikable' : ''} ${!player && currentView === 'opponent' ? 'clikable' : ''}`}
								onClick={() =>
									!disabled &&
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
