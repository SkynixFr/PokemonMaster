import React, { ChangeEvent, useState, useEffect } from 'react';

// Icons
import { Search } from 'lucide-react';

// Interfaces
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
import { toast } from 'sonner';

interface SearchFormProps {
	currentPokemons: PokemonEntity[];
	setCurrentPokemons: (pokemons: PokemonEntity[]) => void;
	savedPokemons: PokemonEntity[];
}

const SearchForm = ({ setCurrentPokemons, savedPokemons }: SearchFormProps) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [pokemonType, setPokemonType] = useState<string>('type');
	const [pokemonGeneration, setPokemonGeneration] =
		useState<string>('generation');

	const generationIds = {
		kanto: { start: 1, end: 151 },
		johto: { start: 152, end: 251 },
		hoenn: { start: 252, end: 386 },
		sinnoh: { start: 387, end: 493 },
		unova: { start: 494, end: 649 },
		kalos: { start: 650, end: 721 },
		alola: { start: 722, end: 809 },
		galar: { start: 810, end: 905 },
		paldea: { start: 906, end: 1025 }
	};

	useEffect(() => {
		filterPokemons();
	}, [pokemonType, searchTerm, pokemonGeneration]);

	const filterPokemons = () => {
		let filteredPokemons = savedPokemons;

		if (searchTerm) {
			filteredPokemons = filteredPokemons.filter(pokemon =>
				pokemon.name.toLowerCase().includes(searchTerm)
			);

			if (filteredPokemons.length === 0) {
				toast.error('No pokemons found, bad name');
				return;
			}
		}

		if (pokemonType !== 'type') {
			filteredPokemons = filteredPokemons.filter(pokemon =>
				pokemon.types.some(type => type.name === pokemonType)
			);

			if (filteredPokemons.length === 0) {
				toast.error('No pokemons found, bad type');
				setPokemonType('type');
				return;
			}
		}

		if (pokemonGeneration !== 'generation') {
			const { start, end } = generationIds[pokemonGeneration];
			filteredPokemons = filteredPokemons.filter(
				pokemon => pokemon.pokedexId >= start && pokemon.pokedexId <= end
			);

			if (filteredPokemons.length === 0) {
				toast.error('No pokemons found, bad generation');
				setPokemonGeneration('generation');
				return;
			}
		}

		setCurrentPokemons(filteredPokemons);
	};

	const handleSearchPokemon = (event: ChangeEvent<HTMLInputElement>) => {
		const search = event.target.value.toLowerCase();
		setSearchTerm(search);
	};

	const handleFilterType = (event: ChangeEvent<HTMLSelectElement>) => {
		const typeValue = event.target.value;
		setPokemonType(typeValue);
	};

	const handleFilterGeneration = (event: ChangeEvent<HTMLSelectElement>) => {
		const generation = event.target.value;
		setPokemonGeneration(generation);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className={'search-pokemons'}>
			<div className={'search-pokemons-bar'}>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search pokemons"
						onChange={handleSearchPokemon}
					/>
					<button type="button" className={'btn-search-moves btn-primary'}>
						<Search width={20} height={20} />
					</button>
				</form>
			</div>
			<div className={'filter-pokemons'}>
				<form action="">
					<select
						name="type"
						id="type"
						defaultValue="type"
						onChange={handleFilterType}
						value={pokemonType}
					>
						<option value="type">Type</option>
						<option value="fire">Fire</option>
						<option value="water">Water</option>
						<option value="grass">Grass</option>
						<option value="electric">Electric</option>
						<option value="rock">Rock</option>
						<option value="ground">Ground</option>
						<option value="flying">Flying</option>
						<option value="psychic">Psychic</option>
						<option value="ghost">Ghost</option>
						<option value="dark">Dark</option>
						<option value="steel">Steel</option>
						<option value="ice">Ice</option>
						<option value="dragon">Dragon</option>
						<option value="fairy">Fairy</option>
						<option value="fighting">Fighting</option>
						<option value="normal">Normal</option>
						<option value="bug">Bug</option>
						<option value="poison">Poison</option>
					</select>

					<select
						name="generation"
						id="generation"
						defaultValue="generation"
						onChange={handleFilterGeneration}
						value={pokemonGeneration}
					>
						<option value="generation">Generation</option>
						<option value="kanto">Kanto</option>
						<option value="johto">Johto</option>
						<option value="hoenn">Hoenn</option>
						<option value="sinnoh">Sinnoh</option>
						<option value="unova">Unova</option>
						<option value="kalos">Kalos</option>
						<option value="alola">Alola</option>
						<option value="galar">Galar</option>
						<option value="paldea">Paldea</option>
					</select>
				</form>
			</div>
		</div>
	);
};

export default SearchForm;
