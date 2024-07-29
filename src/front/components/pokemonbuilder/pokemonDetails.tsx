'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
import { ItemEntity } from '../../../interfaces/pokemon/item/itemEntity';
import { AbilityEntity } from '../../../interfaces/pokemon/ability/abilityEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';
import { StatEntity } from '../../../interfaces/pokemon/stat/statEntity';
import { MoveEntity } from '../../../interfaces/pokemon/move/moveEntity';
import { TeamEntity } from '../../../interfaces/team/teamEntity';

// Components
import CustomImage from '../customImage';
import PokemonType from '../pokemonType';
import PokemonStats from './pokemonStats';
import PokemonMoves from './pokemonMoves';
import PokemonCompetitiveInfos from './pokemonCompetitiveInfos';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { Plus } from 'lucide-react';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

// Interfaces
interface PokemonDetailsProps {
	pokemon: PokemonTeamEntity;
	team: TeamEntity;
	teamActive: TeamEntity;
	setTeamActive: (team: TeamEntity) => void;
	isFromTeam: boolean;
}

const PokemonDetails = ({
	pokemon,
	team,
	teamActive,
	setTeamActive,
	isFromTeam
}: PokemonDetailsProps) => {
	const [genderActive, setGenderActive] = useState<string>('Neutral');
	const [levelActive, setLevelActive] = useState<number>(100);
	const [itemActive, setItemActive] = useState<ItemEntity>(pokemon?.item);
	const [natureActive, setNatureActive] = useState<NatureEntity>(
		pokemon?.nature
	);
	const [abilityActive, setAbilityActive] = useState<AbilityEntity>(
		pokemon?.ability
	);
	const [movesActive, setMovesActive] = useState<MoveEntity[]>(pokemon?.moves);
	const [statsActive, setStatsActive] = useState<StatEntity[]>(pokemon?.stats);

	useEffect(() => {
		setGenderActive('Neutral');
		setLevelActive(100);
		setItemActive(pokemon.item);
		setNatureActive(pokemon.nature);
		setAbilityActive(pokemon.ability);
		setMovesActive(pokemon.moves);
		setStatsActive(pokemon.stats);
	}, [pokemon]);

	const getNatureMultipliers = (nature: NatureEntity) => {
		const multipliers = {
			hp: 1,
			attack: 1,
			defense: 1,
			'special-attack': 1,
			'special-defense': 1,
			speed: 1
		};

		if (nature) {
			if (nature.increasedStat) {
				multipliers[nature.increasedStat] = 1.1;
			}
			if (nature.decreasedStat) {
				multipliers[nature.decreasedStat] = 0.9;
			}
		}

		return multipliers;
	};

	const computeBaseStats = (
		stats: StatEntity[],
		level: number,
		nature: NatureEntity
	) => {
		const natureMultipliers = getNatureMultipliers(nature);
		return stats.map(stat => {
			const baseStat = Math.floor((2 * stat.value * level) / 100);
			const adjustedStat = Math.floor(
				baseStat * natureMultipliers[stat.name]
			);
			return stat.name === 'hp' ? baseStat + level + 10 : adjustedStat + 5;
		});
	};

	const computeBaseStatsWithEvIv = (
		stats: StatEntity[],
		level: number,
		nature: NatureEntity
	) => {
		const natureMultipliers = getNatureMultipliers(nature);
		return stats.map(stat => {
			const baseStat = Math.floor(
				((2 * stat.value + stat.iv + Math.floor(stat.ev / 4)) * level) / 100
			);
			const adjustedStat = Math.floor(
				baseStat * natureMultipliers[stat.name]
			);
			return stat.name === 'hp' ? baseStat + level + 10 : adjustedStat + 5;
		});
	};

	const handleAddPokemon = (team: TeamEntity, pokemon: PokemonTeamEntity) => {
		const baseStats = computeBaseStats(
			statsActive,
			levelActive,
			natureActive
		);

		const totalStats = computeBaseStatsWithEvIv(
			statsActive,
			levelActive,
			natureActive
		);

		const newStatsActive = baseStats.map((stat, index) => ({
			...statsActive[index],
			value: stat,
			base: statsActive[index].value
		}));

		const newTotalStats = totalStats.map((stat, index) => ({
			...newStatsActive[index],
			max: stat,
			total: stat
		}));

		const newPokemon: PokemonTeamEntity = {
			pokedexId: pokemon.pokedexId,
			name: pokemon.name,
			types: pokemon.types,
			gender: 'neutral',
			isShiny: false,
			ability: abilityActive,
			nature: natureActive,
			item: null,
			moves: movesActive,
			stats: newTotalStats,
			level: levelActive,
			weight: pokemon.weight
		};

		if (
			newPokemon.ability === null ||
			newPokemon.nature === null ||
			newPokemon.moves.length != 4
		) {
			toast.warning('Please select an ability, a nature and 4 moves');
			return;
		}

		const newTeam = {
			...teamActive,
			pokemons: [...teamActive.pokemons, newPokemon]
		};

		setTeamActive(newTeam);
	};

	return (
		<div className={'pokemon-details'}>
			<div className={'pokemon-infos'}>
				<div className={'left'}>
					<div className={'pokemon-level'}>LVL {levelActive}</div>
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
				setAbilityActive={setAbilityActive}
				natureActive={natureActive}
				setNatureActive={setNatureActive}
				itemActive={itemActive}
				pokemon={pokemon}
			/>
			<PokemonMoves
				movesActive={movesActive}
				setMovesActive={setMovesActive}
				pokemon={pokemon}
			/>
			<PokemonStats
				statsActive={statsActive}
				setStatsActive={setStatsActive}
				levelActive={levelActive}
				pokemon={pokemon}
				natureActive={natureActive}
				isFromTeam={isFromTeam}
				getNatureMultipliers={getNatureMultipliers}
			/>

			<div className={'add-pokemon'}>
				<button onClick={() => handleAddPokemon(team, pokemon)}>
					Add <Plus />
				</button>
			</div>
		</div>
	);
};

export default PokemonDetails;
