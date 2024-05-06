'use server';

// Interfaces
import { PokemonCreate } from '../../interfaces/pokemon/pokemonCreate';
import { TypeEntity } from '../../interfaces/pokemon/type/typeEntity';
import { MoveCreate } from '../../interfaces/pokemon/move/moveCreate';
import { AbilityCreate } from '../../interfaces/pokemon/ability/abilityCreate';
import { NatureCreate } from '../../interfaces/pokemon/nature/natureCreate';

export const getPokemons = async () => {
	const response = await fetch(
		'https://pokeapi.co/api/v2/pokemon/?limit=1302'
	);
	const pokemonsData = await response.json();
	const totalPokemons = pokemonsData.count;
	const batchSize1 = 500;
	const batchSize2 = 500;
	let pokemons: PokemonCreate[] = [];

	const pokemonBatche1 = await fetchPokemons(0, batchSize1);
	pokemons = pokemons.concat(pokemonBatche1);
	const pokemonBatche2 = await fetchPokemons(batchSize1, batchSize2);
	pokemons = pokemons.concat(pokemonBatche2);
	const remainingPokemons = totalPokemons - batchSize1 - batchSize2;
	const pokemonBatche3 = await fetchPokemons(
		batchSize1 + batchSize2,
		remainingPokemons
	);
	pokemons = pokemons.concat(pokemonBatche3);

	return pokemons;
};

const fetchPokemons = async (offset: number, limit: number) => {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
	);
	const pokemonsData = await response.json();

	const filteredPokemons: { url: string; name: string }[] =
		pokemonsData.results.filter((pokemon: { url: string; name: string }) => {
			const pokemonId = parseInt(pokemon.url.split('/').slice(-2)[0]);
			return pokemonId < 10000;
		});

	const pokemonsPromises = filteredPokemons.map(
		async (pokemon: { url: string; name: string }) => {
			const response = await fetch(pokemon.url);
			const pokemonData = await response.json();

			const pokemonsTypesPromises = pokemonData.types.map(
				async (type: { type: { name: string } }) => {
					const response = await fetch(
						`https://pokeapi.co/api/v2/type/${type.type.name}`
					);
					const typeData = await response.json();
					const damageRelations = {
						doubleDamageFrom:
							typeData.damage_relations.double_damage_from.map(
								(type: { name: string }) => type.name
							),
						doubleDamageTo:
							typeData.damage_relations.double_damage_to.map(
								(type: { name: string }) => type.name
							),
						halfDamageFrom:
							typeData.damage_relations.half_damage_from.map(
								(type: { name: string }) => type.name
							),
						halfDamageTo: typeData.damage_relations.half_damage_to.map(
							(type: { name: string }) => type.name
						),
						noDamageFrom: typeData.damage_relations.no_damage_from.map(
							(type: { name: string }) => type.name
						),
						noDamageTo: typeData.damage_relations.no_damage_to.map(
							(type: { name: string }) => type.name
						)
					};
					return {
						name: type.type.name,
						damageRelation: damageRelations
					};
				}
			);

			const types: TypeEntity[] = await Promise.all(pokemonsTypesPromises);

			const pokemonCreate: PokemonCreate = {
				pokedexId: pokemonData.id,
				name: pokemon.name,
				gender: 'neutral',
				types: types.map(type => {
					return {
						name: type.name,
						damageRelation: {
							doubleDamageFrom: type.damageRelation.doubleDamageFrom,
							doubleDamageTo: type.damageRelation.doubleDamageTo,
							halfDamageFrom: type.damageRelation.halfDamageFrom,
							halfDamageTo: type.damageRelation.halfDamageTo,
							noDamageFrom: type.damageRelation.noDamageFrom,
							noDamageTo: type.damageRelation.noDamageTo
						}
					};
				}),

				stats: pokemonData.stats.map(
					(stat: { base_stat: number; stat: { name: string } }) => {
						return {
							name: stat.stat.name,
							value: stat.base_stat,
							max: stat.base_stat
						};
					}
				),
				weight: pokemonData.weight
			};

			return pokemonCreate;
		}
	);
	return await Promise.all(pokemonsPromises);
};

export const getMoves = async () => {
	const response = await fetch('https://pokeapi.co/api/v2/move/?limit=937');
	await response.json();
	const batchSize1 = 500;
	const batchSize2 = 437;
	let moves: MoveCreate[] = [];

	const movesBatche1 = await fetchMoves(0, batchSize1);
	moves = moves.concat(movesBatche1);
	const movesBatche2 = await fetchMoves(batchSize1, batchSize2);
	moves = moves.concat(movesBatche2);

	return moves;
};

const fetchMoves = async (offset: number, limit: number) => {
	const response = await fetch(
		`https://pokeapi.co/api/v2/move/?offset=${offset}&limit=${limit}`
	);
	const movesData = await response.json();

	const movesPromises = movesData.results.map(
		async (move: { url: string; name: string }) => {
			const response = await fetch(move.url);
			const moveData = await response.json();

			if (!moveData.meta) {
				moveData.meta = {
					ailment: 'none',
					drain: 0,
					healing: 0,
					crit_rate: 0,
					priority: 0,
					ailment_chance: 0,
					flinch_chance: 0,
					stat_chance: 0,
					min_hits: 0,
					max_hits: 0,
					min_turns: 0,
					max_turns: 0
				};
			}
			const meta = {
				ailment: moveData.meta.ailment.name,
				drain: moveData.meta.drain,
				healing: moveData.meta.healing,
				critRate: moveData.meta.crit_rate,
				priority: moveData.priority,
				effectChance: moveData.meta.ailment_chance,
				flinchChance: moveData.meta.flinch_chance,
				statChance: moveData.meta.stat_chance,
				minHits:
					moveData.meta.min_hits === 'null' ? 0 : moveData.meta.min_hits,
				maxHits:
					moveData.meta.max_hits === 'null' ? 0 : moveData.meta.max_hits,
				minTurns:
					moveData.meta.min_turns === 'null' ? 0 : moveData.meta.min_turns,
				maxTurns:
					moveData.meta.max_turns === 'null' ? 0 : moveData.meta.max_turns
			};

			const moveCreate: MoveCreate = {
				name: move.name,
				power: moveData.power,
				accuracy: moveData.accuracy,
				pp: moveData.pp,
				meta: meta,
				type: moveData.type.name,
				category: moveData.damage_class.name,
				description:
					moveData.effect_entries.find(
						(entry: {
							effect: string;
							language: { name: string; url: string };
							short_effect: string;
						}) => entry.language.name === 'en'
					)?.short_effect || 'No description available',
				learnedBy: moveData.learned_by_pokemon.map(
					(pokemon: { name: string; url: string }) => pokemon.name
				),
				statsChange:
					moveData.stat_changes.length > 0
						? moveData.stat_changes.map(
								(statChange: {
									change: number;
									stat: { name: string };
								}) => {
									return {
										stat: statChange.stat.name,
										change: statChange.change
									};
								}
							)
						: null,
				target: moveData.target.name
			};

			return moveCreate;
		}
	);
	return await Promise.all(movesPromises);
};

export const getNatures = async () => {
	const response = await fetch('https://pokeapi.co/api/v2/nature/?limit=25');
	const naturesData = await response.json();
	const naturesPromises: NatureCreate[] = naturesData.results.map(
		async (nature: { url: string; name: string }) => {
			const response = await fetch(nature.url);
			const natureData = await response.json();

			return {
				name: nature.name,
				increasedStat: natureData.increased_stat?.name || 'none',
				decreasedStat: natureData.decreased_stat?.name || 'none'
			};
		}
	);
	return await Promise.all(naturesPromises);
};

export const getAbilities = async () => {
	const response = await fetch('https://pokeapi.co/api/v2/ability/?limit=367');
	const abilitiesData = await response.json();
	const abilitiesPromises: AbilityCreate[] = abilitiesData.results.map(
		async (ability: { url: string; name: string }) => {
			const response = await fetch(ability.url);
			const abilityData = await response.json();

			return {
				name: ability.name,
				description:
					abilityData.effect_entries.find(
						(entry: {
							effect: string;
							language: { name: string; url: string };
							short_effect: string;
						}) => entry.language.name === 'en'
					)?.short_effect || 'No description available',
				learnedBy: abilityData.pokemon.map(
					(pokemon: {
						is_hidden: boolean;
						pokemon: { name: string; url: string };
						slot: number;
					}) => pokemon.pokemon.name
				)
			};
		}
	);
	return await Promise.all(abilitiesPromises);
};
