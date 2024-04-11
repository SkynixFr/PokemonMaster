'use client';
import IPokemon, {
	IPokemonPokedex,
	IPokemonRequest
} from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import { useEffect, useState } from 'react';
import {
	getNextPokemons,
	getPreviousPokemons
} from '../../actions/pokedex.actions';
import PokemonInformation from './pokemonInformation';

interface PokemonListProps {
	addToTeam?: (pokemon: IPokemon) => void;
	pokemons: IPokemonRequest;
}

const PokedexList = ({ pokemons, addToTeam }: PokemonListProps) => {
	const [pokemonSelected, setpokemonSelected] = useState<number | null>(null);
	const [pokemonsPokedex, setPokemonsPokedex] = useState<IPokemonPokedex[]>(
		pokemons.results
	);
	const [page, setPage] = useState<number>(1);
	const [nextReq, setNextReq] = useState<string | null>(null);
	const [previousReq, setPreviousReq] = useState<string | null>(null);

	useEffect(() => {
		if (!pokemons) return;
		setNextReq(pokemons.next);
		setPreviousReq(pokemons.previous);
	}, []);

	const handleNextPokemon = async () => {
		setPage(page + 1);
		const { results, next, previous } = await getNextPokemons(nextReq);
		setPokemonsPokedex(results);
		setNextReq(next);
		setPreviousReq(previous);
	};

	const handlePreviousPokemon = async () => {
		setPage(page - 1);
		const { results, next, previous } =
			await getPreviousPokemons(previousReq);
		setPokemonsPokedex(results);
		setNextReq(next);
		setPreviousReq(previous);
	};

	return (
		<div>
			<h1>Pokemon:</h1>
			<ul
				style={{
					display: 'flex',
					gap: '50px'
				}}
			>
				{pokemonsPokedex ? (
					pokemonsPokedex.map((pokemon: IPokemonPokedex) => (
						<li
							key={pokemon.id}
							onClick={() => setpokemonSelected(pokemon.id)}
						>
							<CustomImage
								src={pokemon.sprite}
								alt={pokemon.name}
								priority={true}
								width={50}
								height={50}
								objectFit={'contain'}
							/>
							<div>
								<span>#{pokemon.id} </span>
								{pokemon.name}
								<ul>
									{pokemon.types.map((type, index) => (
										<li key={index}>{type.name}</li>
									))}
								</ul>
							</div>
						</li>
					))
				) : (
					<div>No pokemons</div>
				)}
			</ul>

			<div>
				<span>Page: {page}</span>
				{page > 1 && (
					<button onClick={handlePreviousPokemon}>Previous</button>
				)}
				{page < 145 && <button onClick={handleNextPokemon}>Next</button>}
			</div>
			{pokemonSelected && (
				<PokemonInformation
					pokemonId={pokemonSelected}
					addToTeam={addToTeam}
				/>
			)}
		</div>
	);
};

export default PokedexList;
