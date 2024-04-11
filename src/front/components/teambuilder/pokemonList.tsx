import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import { PokemonImgByPokemonId } from '../../utils/pokemonImgByPokemonId';

interface PokemonListProps {
	pokemons: IPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
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
							src={PokemonImgByPokemonId[pokemon.id]}
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
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonList;
