'use client';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';

interface PokemonListProps {
	pokemons: IPokemon[];
	teamName?: string;
	addPokemonToTeam?: (pokemon: IPokemon, teamName: string) => Promise<string>;
}
const PokemonPokedexList = ({
	pokemons,
	teamName,
	addPokemonToTeam
}: PokemonListProps) => {
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
						<button
							onClick={async () =>
								await addPokemonToTeam(pokemon, teamName)
							}
						>
							Add to team
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonPokedexList;
