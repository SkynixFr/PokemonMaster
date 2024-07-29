'use client';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

// Components
import CustomImage from '../customImage';
import PokemonType from '../pokemonType';
import SearchForm from './searchForm';

// Interfaces
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
interface PokedexProps {
	pokemons: PokemonEntity[];
	currentPokemons: PokemonEntity[];
	setCurrentPokemons: (pokemons: PokemonEntity[]) => void;
	pokemonActive: PokemonEntity;
	setPokemonActive: (pokemon: PokemonEntity) => void;
	isFromTeam: boolean;
	setIsFromTeam: (isFromTeam: boolean) => void;
}

const Pokedex = ({
	pokemons,
	currentPokemons,
	setCurrentPokemons,
	pokemonActive,
	setPokemonActive,
	isFromTeam,
	setIsFromTeam
}: PokedexProps) => {
	return (
		<div className={'pokedex'}>
			<SearchForm
				savedPokemons={pokemons}
				currentPokemons={currentPokemons}
				setCurrentPokemons={setCurrentPokemons}
			/>
			<div className={'pokedex-pokemons'}>
				{currentPokemons.map(pokemon => (
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
								<div className={'pokemon-id'}>#{pokemon.pokedexId}</div>
								<div className={'pokemon-name'}>
									{firstLetterMaj(pokemon.name)}
								</div>
							</div>
							<div className={'pokemon-types'}>
								<PokemonType types={pokemon.types} isImg={true} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Pokedex;
