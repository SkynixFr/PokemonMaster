'use client';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

// Components
import CustomImage from '../customImage';
import PokemonType from '../pokemonType';
import SearchForm from './searchForm';

// Interfaces
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
import Pagination from '../pagination';
import React from 'react';
interface PokedexProps {
	pokemons: PokemonEntity[];
	currentPokemons: PokemonEntity[];
	setCurrentPokemons: (pokemons: PokemonEntity[]) => void;
	pokemonActive: PokemonEntity;
	setPokemonActive: (pokemon: PokemonEntity) => void;
	isFromTeam: boolean;
	setIsFromTeam: (isFromTeam: boolean) => void;
	totalPages: number;
	currentPage: number;
	setCurrentPage: (currentPage: number) => void;
}

const Pokedex = ({
	pokemons,
	currentPokemons,
	setCurrentPokemons,
	pokemonActive,
	setPokemonActive,
	isFromTeam,
	setIsFromTeam,
	totalPages,
	currentPage,
	setCurrentPage
}: PokedexProps) => {
	return (
		<div className={'pokedex'}>
			<SearchForm
				savedPokemons={pokemons}
				currentPokemons={currentPokemons}
				setCurrentPokemons={setCurrentPokemons}
				setCurrentPage={setCurrentPage}
				totalPages={totalPages}
			/>
			<div
				className={`pokedex-pokemons ${currentPokemons.length < 12 ? 'minus12' : ''}`}
			>
				{currentPokemons.length > 0 ? (
					<>
						{Array.from({ length: 12 }).map((_, index) => {
							const pokemon = currentPokemons[index];
							return pokemon ? (
								<div
									key={pokemon.pokedexId}
									className={`pokedex-pokemon ${
										!isFromTeam &&
										pokemonActive.pokedexId === pokemon.pokedexId
											? 'active'
											: ''
									}`}
									onClick={() => {
										setIsFromTeam(false);
										setPokemonActive(pokemon);
									}}
								>
									<div className={'bg-pokemon'}>
										<CustomImage
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
											alt={pokemon.name}
											fill={true}
											sizes="(max-width: 768px) 150px, 150px"
										/>
									</div>
									<div className={'pokemon-infos'}>
										<div>
											<div className={'pokemon-id'}>
												#{pokemon.pokedexId}
											</div>
											<div className={'pokemon-name'}>
												{firstLetterMaj(pokemon.name)}
											</div>
										</div>
										<div className={'pokemon-types'}>
											<PokemonType
												types={pokemon.types}
												isImg={true}
											/>
										</div>
									</div>
								</div>
							) : (
								<div key={index} className="empty-slot"></div>
							);
						})}
					</>
				) : (
					<h3>No pokemons found</h3>
				)}
			</div>
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};

export default Pokedex;
