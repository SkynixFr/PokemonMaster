'use client';
import { useState } from 'react';

// Interfaces
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
interface PokemonDetailsProps {
	pokemon: PokemonEntity;
}

// Components
import CustomImage from '../customImage';
import PokemonType from '../pokemonType';

// Icons
import { Plus, Sparkles } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import { firstLetterMaj } from '../../utils/formatString';

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
	const [genderActive, setGenderActive] = useState<string>('female');

	const pokemonLevel = pokemon.level;
	console.log(pokemon);
	return (
		<div className={'pokemon-details'}>
			<div className={'pokemon-infos'}>
				<div className={'left'}>
					<button className={'pokemon-level'}>LVL {pokemonLevel}</button>
					{/*<button className={'pokemon-shiny'} disabled>*/}
					{/*	<Sparkles />*/}
					{/*</button>*/}
				</div>
				<div className={'middle'}>
					<div className={'pokemon-img'}>
						<CustomImage
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
							alt={pokemon.name}
							fill={true}
							sizes="(max-width: 768px) 150px, 300px"
						/>
					</div>
					<div className={'pokedex-id'}>#{pokemon.pokedexId}</div>
					<div className={'pokemon-name'}>
						{firstLetterMaj(pokemon.name)}
					</div>
					<div className={'pokemon-types'}>
						<PokemonType types={pokemon.types} />
					</div>
				</div>
				<div className={'right'}>
					<button
						className={`pokemon-female ${genderActive === 'female' ? 'active' : ''}`}
						onClick={() => setGenderActive('female')}
					>
						<FontAwesomeIcon icon={faVenus} />
					</button>
					<button
						className={`pokemon-male ${genderActive === 'male' ? 'active' : ''}`}
						onClick={() => setGenderActive('male')}
					>
						<FontAwesomeIcon icon={faMars} />
					</button>
				</div>
			</div>
			<div className={'pokemon-competitive-infos'}>
				<div className="pokemon-item">
					<h3>Item</h3>
					<button>{pokemon.item ? pokemon.item.name : 'No item'}</button>
				</div>
				<div className="pokemon-nature">
					<h3>Nature</h3>
					<button>
						{pokemon.nature ? pokemon.nature.name : 'No nature'}
					</button>
				</div>
				<div className="pokemon-ability">
					<h3>Ability</h3>
					<button>
						{pokemon.abilities ? pokemon.abilities[0].name : 'No ability'}
					</button>
				</div>
			</div>
			<div className="pokemon-moves">
				<h3>Moves</h3>
				<div className="pokemon-move">Move 1</div>
				<div className="pokemon-move">Move 2</div>
				<div className="pokemon-move">Move 3</div>
				<div className="pokemon-move">Move 4</div>
			</div>
			<div className="pokemon-stats">
				<h3>Stats</h3>
				<div className={'stats-title'}>
					<div>Base</div>
					<div>EVs</div>
					<div>IVs</div>
					<div>Stats</div>
				</div>
			</div>
			<div className={'add-pokemon'}>
				<button>
					Add <Plus />
				</button>
			</div>
		</div>
	);
};

export default PokemonDetails;
