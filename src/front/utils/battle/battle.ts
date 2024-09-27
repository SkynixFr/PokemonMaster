import { TeamEntity } from '../../../interfaces/team/teamEntity';
import Battle from '../../../back/classes/battle';
import Team from '../../../back/classes/team';
import Pokemon from '../../../back/classes/pokemon';
import TypeEffectiveness from '../../../back/classes/typeEffectiveness';
import Ability from '../../../back/classes/ability';
import Nature from '../../../back/classes/nature';
import Move from '../../../back/classes/move';
import Stat from '../../../back/classes/stat';
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
import { TypeEntity } from '../../../interfaces/pokemon/type/typeEntity';
import { MoveEntity } from '../../../interfaces/pokemon/move/moveEntity';
import { StatEntity } from '../../../interfaces/pokemon/stat/statEntity';

export function battle(): TeamEntity {
	return {
		id: 'opponent-team',
		name: 'Team Rocket',
		avatar: {
			id: '66f5356c1946060bb2a4271b',
			name: 'Team Rocket',
			region: 'Other',
			sprite: '/images/avatars/other/teamRocket.png'
		},
		pokemons: [
			{
				pokedexId: 24,
				name: 'arbok',
				types: [
					{
						name: 'poison',
						damageRelation: {
							doubleDamageFrom: ['ground', 'psychic'],
							doubleDamageTo: ['grass', 'fairy'],
							halfDamageFrom: [
								'fighting',
								'poison',
								'bug',
								'grass',
								'fairy'
							],
							halfDamageTo: ['poison', 'ground', 'rock', 'ghost'],
							noDamageFrom: [],
							noDamageTo: ['steel']
						}
					}
				],
				level: 100,
				ability: {
					id: '66f129e173d6f80915e88f72',
					name: 'intimidate',
					description:
						"Lowers opponents' Attack one stage upon entering battle.",
					learnedBy: []
				},
				nature: {
					id: '66f40d0bb976b901b11767ee',
					name: 'adamant',
					increasedStat: 'attack',
					decreasedStat: 'special-attack'
				},
				gender: 'neutral',
				isShiny: false,
				moves: [
					{
						id: '66f32ce32072986d98236933',
						name: 'bite',
						power: 60,
						accuracy: 100,
						pp: 25,
						maxPp: 25,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 30,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'dark',
						category: 'physical',
						description: 'Has a 30% chance to make the target flinch.',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32ce32072986d98236929',
						name: 'body-slam',
						power: 85,
						accuracy: 100,
						pp: 15,
						maxPp: 15,
						meta: {
							ailment: 'paralysis',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 30,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'normal',
						category: 'physical',
						description: 'Has a 30% chance to paralyze the target.',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32cf12072986d98236bbc',
						name: 'brutal-swing',
						power: 60,
						accuracy: 100,
						pp: 20,
						maxPp: 20,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'dark',
						category: 'physical',
						description:
							'Inflicts regular damage with no additional effect.',
						learnedBy: [],
						target: 'all-other-pokemon',
						statsChange: null
					},
					{
						id: '66f32cee2072986d98236b12',
						name: 'bulldoze',
						power: 60,
						accuracy: 100,
						pp: 20,
						maxPp: 20,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: -1,
							effectChance: 0,
							flinchChance: 0,
							statChance: 100,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'ground',
						category: 'physical',
						description:
							"Has a 100% chance to lower the target's Speed by one stage.",
						learnedBy: [],
						statsChange: [{ change: -1, stat: 'speed' }],
						target: 'all-other-pokemon'
					}
				],
				stats: [
					{
						name: 'hp',
						value: 230.0,
						max: 230,
						ev: 0,
						iv: 0,
						total: 230,
						base: 60
					},
					{
						name: 'attack',
						value: 160.0,
						max: 160,
						ev: 0,
						iv: 0,
						total: 160,
						base: 85
					},
					{
						name: 'defense',
						value: 100.0,
						max: 100,
						ev: 0,
						iv: 0,
						total: 100,
						base: 69
					},
					{
						name: 'special-attack',
						value: 60.0,
						max: 60,
						ev: 0,
						iv: 0,
						total: 60,
						base: 65
					},
					{
						name: 'special-defense',
						value: 100.0,
						max: 100,
						ev: 0,
						iv: 0,
						total: 100,
						base: 79
					},
					{
						name: 'speed',
						value: 120.0,
						max: 120,
						ev: 0,
						iv: 0,
						total: 120,
						base: 80
					}
				],
				weight: 650,
				item: null
			},
			{
				pokedexId: 110,
				item: null,
				name: 'weezing',
				types: [
					{
						name: 'poison',
						damageRelation: {
							doubleDamageFrom: ['ground', 'psychic'],
							doubleDamageTo: ['grass', 'fairy'],
							halfDamageFrom: [
								'fighting',
								'poison',
								'bug',
								'grass',
								'fairy'
							],
							halfDamageTo: ['poison', 'ground', 'rock', 'ghost'],
							noDamageFrom: [],
							noDamageTo: ['steel']
						}
					}
				],
				level: 100,
				ability: {
					id: '66f129e273d6f80915e88f76',
					name: 'levitate',
					description: 'Evades ground moves.',
					learnedBy: []
				},
				nature: {
					id: '66f40d0bb976b901b11767ee',
					name: 'adamant',
					increasedStat: 'attack',
					decreasedStat: 'special-attack'
				},
				gender: 'neutral',
				isShiny: false,
				moves: [
					{
						id: '66f32ceb2072986d98236a7b',
						name: 'assurance',
						power: 60,
						accuracy: 100,
						pp: 10,
						maxPp: 10,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'dark',
						category: 'physical',
						description:
							'Power is doubled if the target has already received damage this turn.',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32ceb2072986d98236a96',
						name: 'dark-pulse',
						power: 80,
						accuracy: 100,
						pp: 15,
						maxPp: 15,
						meta: {
							ailment: 'flinch',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 20,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'dark',
						category: 'special',
						description: 'Has a 20% chance to make the target flinch.',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32ce82072986d982369f4',
						name: 'hidden-power',
						power: 60,
						accuracy: 100,
						pp: 15,
						maxPp: 15,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'normal',
						category: 'special',
						description:
							"Power and type depend upon user's IVs.  Power can range from 30 to 70.",
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32ce92072986d98236a29',
						name: 'secret-power',
						power: 70,
						accuracy: 100,
						pp: 20,
						maxPp: 20,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 30,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						statsChange: null,
						type: 'normal',
						category: 'physical',
						description:
							'Has a 30% chance to inflict a status effect which depends upon the terrain.',
						learnedBy: [],
						target: 'selected-pokemon'
					}
				],
				stats: [
					{
						name: 'hp',
						value: 240.0,
						max: 240,
						ev: 0,
						iv: 0,
						total: 240,
						base: 65
					},
					{
						name: 'attack',
						value: 203.0,
						max: 203,
						ev: 0,
						iv: 0,
						total: 203,
						base: 90
					},
					{
						name: 'defense',
						value: 245.0,
						max: 245,
						ev: 0,
						iv: 0,
						total: 245,
						base: 120
					},
					{
						name: 'special-attack',
						value: 158.0,
						max: 158,
						ev: 0,
						iv: 0,
						total: 158,
						base: 85
					},
					{
						name: 'special-defense',
						value: 145.0,
						max: 145,
						ev: 0,
						iv: 0,
						total: 145,
						base: 70
					},
					{
						name: 'speed',
						value: 125.0,
						max: 125,
						ev: 0,
						iv: 0,
						total: 125,
						base: 60
					}
				],
				weight: 95
			},
			{
				pokedexId: 52,
				name: 'meowth',
				types: [
					{
						name: 'normal',
						damageRelation: {
							doubleDamageFrom: ['fighting'],
							doubleDamageTo: [],
							halfDamageFrom: [],
							halfDamageTo: ['rock', 'steel'],
							noDamageFrom: ['ghost'],
							noDamageTo: ['ghost']
						}
					}
				],
				level: 100,
				ability: {
					id: '66f129e273d6f80915e88f91',
					name: 'pickup',
					description:
						"Picks up other Pokémon's used and Flung held items.  May also pick up an item after battle.",
					learnedBy: []
				},
				nature: {
					id: '66f40d0bb976b901b11767ee',
					name: 'adamant',
					increasedStat: 'attack',
					decreasedStat: 'special-attack'
				},
				gender: 'neutral',
				isShiny: false,
				moves: [
					{
						id: '66f32ceb2072986d98236a7b',
						name: 'assurance',
						power: 60,
						accuracy: 100,
						pp: 10,
						maxPp: 10,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'dark',
						category: 'physical',
						description:
							'Power is doubled if the target has already received damage this turn.',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32ce32072986d98236933',
						name: 'bite',
						power: 60,
						accuracy: 100,
						pp: 25,
						maxPp: 25,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 30,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'dark',
						category: 'physical',
						description: 'Has a 30% chance to make the target flinch.',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32cf52072986d98236c7d',
						name: 'chilling-water',
						power: 50,
						accuracy: 100,
						pp: 20,
						maxPp: 20,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 0,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'water',
						category: 'special',
						description: 'No description available',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					},
					{
						id: '66f32ceb2072986d98236a96',
						name: 'dark-pulse',
						power: 80,
						accuracy: 100,
						pp: 15,
						maxPp: 15,
						meta: {
							ailment: 'none',
							drain: 0,
							healing: 0,
							critRate: 0,
							priority: 0,
							effectChance: 0,
							flinchChance: 20,
							statChance: 0,
							minHits: 0,
							maxHits: 0,
							minTurns: 0,
							maxTurns: 0
						},
						type: 'dark',
						category: 'special',
						description: 'Has a 20% chance to make the target flinch.',
						learnedBy: [],
						target: 'selected-pokemon',
						statsChange: null
					}
				],
				stats: [
					{
						name: 'hp',
						value: 190.0,
						max: 190,
						ev: 0,
						iv: 0,
						total: 190,
						base: 40
					},
					{
						name: 'attack',
						value: 104.0,
						max: 104,
						ev: 0,
						iv: 0,
						total: 104,
						base: 45
					},
					{
						name: 'defense',
						value: 75.0,
						max: 75,
						ev: 0,
						iv: 0,
						total: 75,
						base: 35
					},
					{
						name: 'special-attack',
						value: 77.0,
						max: 77,
						ev: 0,
						iv: 0,
						total: 77,
						base: 40
					},
					{
						name: 'special-defense',
						value: 85.0,
						max: 85,
						ev: 0,
						iv: 0,
						total: 85,
						base: 40
					},
					{
						name: 'speed',
						value: 185.0,
						max: 185,
						ev: 0,
						iv: 0,
						total: 185,
						base: 90
					}
				],
				weight: 42,
				item: null
			}
		]
	};
}

export function createBattle(playerTeam: TeamEntity): Battle {
	const opponentTeam = battle();
	return new Battle(
		new Team(
			playerTeam.id,
			playerTeam.name,
			playerTeam.avatar,
			playerTeam.pokemons.map(
				(pokemon: PokemonEntity, index) =>
					new Pokemon(
						pokemon.pokedexId,
						pokemon.name,
						pokemon.types.map(
							type =>
								new TypeEffectiveness(type.name, type.damageRelation)
						),
						pokemon.level,
						new Ability(
							pokemon.ability.id,
							pokemon.ability.name,
							pokemon.ability.description,
							pokemon.ability.learnedBy
						),
						new Nature(
							pokemon.nature.id,
							pokemon.nature.name,
							pokemon.nature.increasedStat,
							pokemon.nature.decreasedStat
						),
						pokemon.gender,
						pokemon.isShiny,
						pokemon.moves.map(
							move =>
								new Move(
									move.id,
									move.name,
									move.power,
									move.accuracy,
									move.pp,
									move.maxPp,
									move.meta,
									move.type,
									move.category,
									move.description,
									move.learnedBy,
									move.statsChange,
									move.target
								)
						),
						'',
						pokemon.stats.map(
							stat =>
								new Stat(
									stat.name,
									stat.value,
									stat.max,
									stat.ev,
									stat.iv,
									stat.total,
									stat.base
								)
						),
						pokemon.weight,
						new Move(
							pokemon.moves[0].id,
							pokemon.moves[0].name,
							pokemon.moves[0].power,
							pokemon.moves[0].accuracy,
							pokemon.moves[0].pp,
							pokemon.moves[0].maxPp,
							pokemon.moves[0].meta,
							pokemon.moves[0].type,
							pokemon.moves[0].category,
							pokemon.moves[0].description,
							pokemon.moves[0].learnedBy,
							pokemon.moves[0].statsChange,
							pokemon.moves[0].target
						),
						null,
						null,
						index
					)
			)
		),
		new Team(
			opponentTeam.id,
			opponentTeam.name,
			opponentTeam.avatar,
			opponentTeam.pokemons.map(
				(pokemon: PokemonEntity, index) =>
					new Pokemon(
						pokemon.pokedexId,
						pokemon.name,
						pokemon.types.map(
							type =>
								new TypeEffectiveness(type.name, type.damageRelation)
						),
						pokemon.level,
						new Ability(
							pokemon.ability.id,
							pokemon.ability.name,
							pokemon.ability.description,
							pokemon.ability.learnedBy
						),
						new Nature(
							pokemon.nature.id,
							pokemon.nature.name,
							pokemon.nature.increasedStat,
							pokemon.nature.decreasedStat
						),
						pokemon.gender,
						pokemon.isShiny,
						pokemon.moves.map(
							move =>
								new Move(
									move.id,
									move.name,
									move.power,
									move.accuracy,
									move.pp,
									move.maxPp,
									move.meta,
									move.type,
									move.category,
									move.description,
									move.learnedBy,
									move.statsChange,
									move.target
								)
						),
						'',
						pokemon.stats.map(
							stat =>
								new Stat(
									stat.name,
									stat.value,
									stat.max,
									stat.ev,
									stat.iv,
									stat.total,
									stat.base
								)
						),
						pokemon.weight,
						new Move(
							pokemon.moves[0].id,
							pokemon.moves[0].name,
							pokemon.moves[0].power,
							pokemon.moves[0].accuracy,
							pokemon.moves[0].pp,
							pokemon.moves[0].maxPp,
							pokemon.moves[0].meta,
							pokemon.moves[0].type,
							pokemon.moves[0].category,
							pokemon.moves[0].description,
							pokemon.moves[0].learnedBy,
							pokemon.moves[0].statsChange,
							pokemon.moves[0].target
						),
						null,
						null,
						index
					)
			)
		),
		new Pokemon(
			playerTeam.pokemons[0].pokedexId,
			playerTeam.pokemons[0].name,
			playerTeam.pokemons[0].types.map(
				(type: TypeEntity) =>
					new TypeEffectiveness(type.name, type.damageRelation)
			),
			playerTeam.pokemons[0].level,
			new Ability(
				playerTeam.pokemons[0].ability.id,
				playerTeam.pokemons[0].ability.name,
				playerTeam.pokemons[0].ability.description,
				playerTeam.pokemons[0].ability.learnedBy
			),
			new Nature(
				playerTeam.pokemons[0].nature.id,
				playerTeam.pokemons[0].nature.name,
				playerTeam.pokemons[0].nature.increasedStat,
				playerTeam.pokemons[0].nature.decreasedStat
			),
			playerTeam.pokemons[0].gender,
			playerTeam.pokemons[0].isShiny,
			playerTeam.pokemons[0].moves.map(
				(move: MoveEntity) =>
					new Move(
						move.id,
						move.name,
						move.power,
						move.accuracy,
						move.pp,
						move.maxPp,
						move.meta,
						move.type,
						move.category,
						move.description,
						move.learnedBy,
						move.statsChange,
						move.target
					)
			),
			'',
			playerTeam.pokemons[0].stats.map(
				(stat: StatEntity) =>
					new Stat(
						stat.name,
						stat.value,
						stat.max,
						stat.ev,
						stat.iv,
						stat.total,
						stat.base
					)
			),
			playerTeam.pokemons[0].weight,
			new Move(
				playerTeam.pokemons[0].moves[0].id,
				playerTeam.pokemons[0].moves[0].name,
				playerTeam.pokemons[0].moves[0].power,
				playerTeam.pokemons[0].moves[0].accuracy,
				playerTeam.pokemons[0].moves[0].pp,
				playerTeam.pokemons[0].moves[0].maxPp,
				playerTeam.pokemons[0].moves[0].meta,
				playerTeam.pokemons[0].moves[0].type,
				playerTeam.pokemons[0].moves[0].category,
				playerTeam.pokemons[0].moves[0].description,
				playerTeam.pokemons[0].moves[0].learnedBy,
				playerTeam.pokemons[0].moves[0].statsChange,
				playerTeam.pokemons[0].moves[0].target
			),
			null,
			null,
			0
		),
		new Pokemon(
			opponentTeam.pokemons[0].pokedexId,
			opponentTeam.pokemons[0].name,
			opponentTeam.pokemons[0].types.map(
				(type: TypeEntity) =>
					new TypeEffectiveness(type.name, type.damageRelation)
			),
			opponentTeam.pokemons[0].level,
			new Ability(
				opponentTeam.pokemons[0].ability.id,
				opponentTeam.pokemons[0].ability.name,
				opponentTeam.pokemons[0].ability.description,
				opponentTeam.pokemons[0].ability.learnedBy
			),
			new Nature(
				opponentTeam.pokemons[0].nature.id,
				opponentTeam.pokemons[0].nature.name,
				opponentTeam.pokemons[0].nature.increasedStat,
				opponentTeam.pokemons[0].nature.decreasedStat
			),
			opponentTeam.pokemons[0].gender,
			opponentTeam.pokemons[0].isShiny,
			opponentTeam.pokemons[0].moves.map(
				(move: MoveEntity) =>
					new Move(
						move.id,
						move.name,
						move.power,
						move.accuracy,
						move.pp,
						move.maxPp,
						move.meta,
						move.type,
						move.category,
						move.description,
						move.learnedBy,
						move.statsChange,
						move.target
					)
			),
			'',
			opponentTeam.pokemons[0].stats.map(
				(stat: StatEntity) =>
					new Stat(
						stat.name,
						stat.value,
						stat.max,
						stat.ev,
						stat.iv,
						stat.total,
						stat.base
					)
			),
			opponentTeam.pokemons[0].weight,
			new Move(
				opponentTeam.pokemons[0].moves[0].id,
				opponentTeam.pokemons[0].moves[0].name,
				opponentTeam.pokemons[0].moves[0].power,
				opponentTeam.pokemons[0].moves[0].accuracy,
				opponentTeam.pokemons[0].moves[0].pp,
				opponentTeam.pokemons[0].moves[0].maxPp,
				opponentTeam.pokemons[0].moves[0].meta,
				opponentTeam.pokemons[0].moves[0].type,
				opponentTeam.pokemons[0].moves[0].category,
				opponentTeam.pokemons[0].moves[0].description,
				opponentTeam.pokemons[0].moves[0].learnedBy,
				opponentTeam.pokemons[0].moves[0].statsChange,
				opponentTeam.pokemons[0].moves[0].target
			),
			null,
			null,
			0
		),
		1
	);
}
