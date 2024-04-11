'use client';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';

interface PokemonListProps {
	pokemons: IPokemon[];
	teamPokemons?: IPokemon[];
	addToTeam?: (pokemon: IPokemon) => void;
}
const PokedexList = ({ pokemons, addToTeam }: PokemonListProps) => {
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
					<li key={pokemon.name}>
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
		</div>
	);
};

export default PokedexList;
