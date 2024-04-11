'use client';
import { useState } from 'react';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import PokemonInformation from './pokemonInformation';

interface PokemonListProps {
	pokemons: IPokemon[];
	addToTeam?: (pokemon: IPokemon) => void;
}
const PokedexList = ({ pokemons, addToTeam }: PokemonListProps) => {
	const [pokemonSelected, setpokemonSelected] = useState<IPokemon | null>(
		null
	);
	return (
		<div>
			<h1>Pokemon:</h1>
			<ul
				style={{
					display: 'flex',
					gap: '50px'
				}}
			>
				{pokemons.map((pokemon: IPokemon) => (
					<li
						key={pokemon.name}
						onClick={() => setpokemonSelected(pokemon)}
						style={{
							cursor: 'pointer'
						}}
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
						</div>
						<button onClick={() => addToTeam(pokemon)}>
							Add to team
						</button>
					</li>
				))}
			</ul>
			{pokemonSelected && (
				<PokemonInformation pokemon={pokemonSelected}></PokemonInformation>
			)}
		</div>
	);
};

export default PokedexList;
