'use client';
import { useEffect, useState } from 'react';

// Interfaces
interface PokemonDetailsProps {
	pokemon: PokemonTeamEntity;
}
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
import { ItemEntity } from '../../../interfaces/pokemon/item/itemEntity';
import { AbilityEntity } from '../../../interfaces/pokemon/ability/abilityEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';

// Components
import CustomImage from '../customImage';
import PokemonType from '../pokemonType';
import PokemonStats from './pokemonStats';
import PokemonMoves from './pokemonMoves';
import PokemonCompetitiveInfos from './pokemonCompetitiveInfos';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import { Plus } from 'lucide-react';
import { firstLetterMaj } from '../../utils/formatString';

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
	const [genderActive, setGenderActive] = useState<string>('Neutral');
	const [levelActive, setLevelActive] = useState<number>(pokemon.level);
	const [itemActive, setItemActive] = useState<ItemEntity>(pokemon.item);
	const [natureActive, setNatureActive] = useState<NatureEntity>(
		pokemon.nature
	);
	const [abilityActive, setAbilityActive] = useState<AbilityEntity>(
		pokemon.ability
	);
	const [movesActive, setMovesActive] = useState(pokemon.moves);
	const [statsActive, setStatsActive] = useState(pokemon.stats);

	useEffect(() => {
		setGenderActive('Neutral');
		setLevelActive(pokemon.level);
		setItemActive(pokemon.item);
		setNatureActive(pokemon.nature);
		setAbilityActive(pokemon.ability);
		setMovesActive(pokemon.moves);
		setStatsActive(pokemon.stats);
	}, [pokemon]);
	return (
		<div className={'pokemon-details'}>
			<div className={'pokemon-infos'}>
				<div className={'left'}>
					<button
						className={'pokemon-level'}
						onClick={() =>
							setLevelActive(
								levelActive === 1 ? 50 : levelActive === 50 ? 100 : 1
							)
						}
					>
						LVL {levelActive}
					</button>
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
						className={`pokemon-female ${genderActive === 'Female' ? 'active' : ''}`}
						onClick={() => setGenderActive('Female')}
					>
						<FontAwesomeIcon icon={faVenus} />
					</button>
					<button
						className={`pokemon-male ${genderActive === 'Male' ? 'active' : ''}`}
						onClick={() => setGenderActive('Male')}
					>
						<FontAwesomeIcon icon={faMars} />
					</button>
				</div>
			</div>
			<PokemonCompetitiveInfos
				abilityActive={abilityActive}
				natureActive={natureActive}
				itemActive={itemActive}
			/>
			<PokemonMoves movesActive={movesActive} />
			<PokemonStats statsActive={statsActive} />

			<div className={'add-pokemon'}>
				<button>
					Add <Plus />
				</button>
			</div>
		</div>
	);
};

export default PokemonDetails;
