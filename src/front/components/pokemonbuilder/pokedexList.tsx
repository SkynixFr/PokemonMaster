'use client';
import IPokemon, {
	IPokemonPokedex,
	IPokemonRequest
} from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import { FormEvent, useEffect, useState } from 'react';
import {
	getNextPokemons,
	getPokemonByName,
	getPokemonByType,
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
	const originalPokemons = pokemons.results;

	const [page, setPage] = useState<number>(1);
	const [nextReq, setNextReq] = useState<string | null>(null);
	const [previousReq, setPreviousReq] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');

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

	const handleSearchPokemon = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (searchTerm === '') return setPokemonsPokedex(originalPokemons);
		const pokemon = await getPokemonByName(searchTerm.toLowerCase());
		if (pokemon.name === searchTerm.toLowerCase()) {
			setPokemonsPokedex([pokemon]);
		}
	};

	const handleTypeChange = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		event.preventDefault();
		const selectedType = event.target.value;
		setSearchTerm(selectedType);
		if (selectedType === 'All Types') {
			setPokemonsPokedex(originalPokemons);
		} else {
			const pokemons = await getPokemonByType(selectedType);
			setPokemonsPokedex(pokemons.results);
		}
	};

	return (
		<div>
			<h1>Pokemon:</h1>
			<div>
				<form onSubmit={handleSearchPokemon}>
					<input
						type="text"
						id="search"
						name="Search"
						placeholder="Search Pokemon"
						onChange={e => {
							if (e.target.value === '') {
								setPokemonsPokedex(originalPokemons);
								setSearchTerm('');
							} else {
								setSearchTerm(e.target.value);
							}
						}}
					/>
					<button>Search</button>
					<select value={searchTerm} onChange={handleTypeChange}>
						<option value="All Types">All Types</option>
						<option value="fire">Fire</option>
						<option value="water">Water</option>
						<option value="grass">Grass</option>
						<option value="electric">Electric</option>
						<option value="rock">Rock</option>
						<option value="ground">Ground</option>
						<option value="ice">Ice</option>
						<option value="poison">Poison</option>
						<option value="flying">Flying</option>
						<option value="bug">Bug</option>
						<option value="normal">Normal</option>
						<option value="fighting">Fighting</option>
						<option value="psychic">Psychic</option>
						<option value="ghost">Ghost</option>
						<option value="dragon">Dragon</option>
						<option value="dark">Dark</option>
						<option value="steel">Steel</option>
						<option value="fairy">Fairy</option>
					</select>
				</form>
			</div>
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
