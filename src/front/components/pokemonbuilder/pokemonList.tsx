'use client';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';

interface PokemonListProps {
	pokemons: IPokemon[];
	teamName?: string;
	removePokemonFromTeam?: (
		pokemon: IPokemon,
		teamName: string
	) => Promise<string>;
}

const PokemonList = ({
	pokemons,
	teamName,
	removePokemonFromTeam
}: PokemonListProps) => {
	return (
		<div>
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
						{removePokemonFromTeam && (
							<button
								onClick={async () =>
									await removePokemonFromTeam(pokemon, teamName)
								}
							>
								Remove from team
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonList;
