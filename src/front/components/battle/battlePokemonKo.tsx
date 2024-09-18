// Classes
import Team from '../../../back/classes/team';
import Pokemon from '../../../back/classes/pokemon';

// Components
import CustomImage from '../customImage';

// Utils
import { firstLetterMaj } from '../../utils/formatString';
import { useEffect } from 'react';

// Interfaces
interface BattlePokemonKoProps {
	team: Team;
	setActivePokemonKo: (value: boolean) => void;
	activePokemon: Pokemon;
	setActivePokemon: (value: Pokemon) => void;
	recreatePokemonFromParsed: (pokemon: Pokemon) => Pokemon;
	player: boolean;
	setCurrentView: (value: 'player' | 'opponent') => void;
}

const BattlePokemonKo = ({
	team,
	activePokemon,
	setActivePokemonKo,
	setActivePokemon,
	recreatePokemonFromParsed,
	player,
	setCurrentView
}: BattlePokemonKoProps) => {
	const handleSwitchPokemon = (pokemon: Pokemon) => {
		if (pokemon.stats[0].value === 0) return;
		const newPokemon = recreatePokemonFromParsed(pokemon);
		setActivePokemon(newPokemon);
		setActivePokemonKo(false);
		if (!player) {
			setCurrentView('player');
		}
	};

	useEffect(() => {
		const counterPokemonsAlive = team.pokemons.filter(
			pokemon => pokemon.stats[0].value > 0
		).length;

		if (counterPokemonsAlive === 1) {
			const pokemonAlive = team.pokemons.find(
				pokemon => pokemon.stats[0].value > 0
			);

			setActivePokemon(recreatePokemonFromParsed(pokemonAlive));
			setActivePokemonKo(false);
			if (!player) {
				setCurrentView('player');
			}
		}
	}, []);

	return (
		<div className={'pokemon-ko-modal'}>
			<div className={'pokemon-ko-modal-body'}>
				<h2>
					{firstLetterMaj(activePokemon.name)} is KO! Please select a new
					Pokemon.
				</h2>
				<span>
					Pick a Pokemon to switch to. A switch will be considered as a
					turn.
				</span>
				<div className={'pokemon-ko-modal-pokemons'}>
					{team.pokemons.map((pokemon: Pokemon) => (
						<div
							key={pokemon.name}
							onClick={() => handleSwitchPokemon(pokemon)}
							className={`pokemon-ko-modal-pokemon ${
								pokemon.stats[0].value === 0 ? 'ko' : ''
							}
							`}
						>
							<CustomImage
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
								alt={pokemon.name}
								width={150}
								height={150}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BattlePokemonKo;
