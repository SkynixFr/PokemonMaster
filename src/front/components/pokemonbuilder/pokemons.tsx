'use client';
import { useState } from 'react';

// Components
import Pokedex from './pokedex';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
import PokemonDetails from './pokemonDetails';
import Pagination from '../../pagination';
interface PokemonsProps {
	team: TeamEntity;
	pokemons: PokemonEntity[];
}

// Utils
const NUMBER_OF_POKEMONS = 12;

const Pokemons = ({ team, pokemons }: PokemonsProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const currentIndex = (currentPage - 1) * NUMBER_OF_POKEMONS;
	const endIndex = currentIndex + NUMBER_OF_POKEMONS;
	const currentPokemons = pokemons.slice(currentIndex, endIndex);
	const totalPages = Math.ceil(pokemons.length / NUMBER_OF_POKEMONS);
	const [pokemonActive, setPokemonActive] = useState<PokemonEntity>(
		currentPokemons[0]
	);

	return (
		<div className={'pokemons-infos'}>
			<div className={'pokemons'}>
				<div className={'team-pokemons'}>
					{team.pokemons && team.pokemons.length > 0 ? (
						team.pokemons.map(pokemon => (
							<div key={pokemon.pokedexId}>{pokemon.name}</div>
						))
					) : (
						<h3>No pokemons in your team</h3>
					)}
				</div>
				<Pokedex
					currentPokemons={currentPokemons}
					pokemonActive={pokemonActive}
					setPokemonActive={setPokemonActive}
				/>
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</div>
			<PokemonDetails pokemon={pokemonActive} />
		</div>
	);
};

export default Pokemons;
