import { IPokemonPokedex, IPokemonRequest } from '../../interfaces/IPokemon';
import axios from 'axios';
import { PokemonImgByPokemonId } from '../utils/pokemonImgByPokemonId';
import IPokemonEntity from '../../interfaces/IPokemon';

export async function getPokedexPokemons(): Promise<IPokemonRequest> {
	try {
		const response = await axios.get(
			'https://pokeapi.co/api/v2/pokemon/?limit=9,offset=0'
		);

		const { next, previous, results } = response.data;

		const promises = results.map(async (pokemon: any) => {
			const pokemonResponseDetails = await axios.get(pokemon.url);
			const { id, name, types } = pokemonResponseDetails.data;
			const pokemonDataApi: IPokemonPokedex = {
				name: name,
				id: id,
				types: types.map((type: any) => {
					return { name: type.type.name };
				}),
				sprite: PokemonImgByPokemonId[id]
			};
			return pokemonDataApi;
		});
		return {
			results: await Promise.all(promises),
			next,
			previous
		};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

export async function getNextPokemons(
	nextRequest: string
): Promise<IPokemonRequest> {
	try {
		const response = await axios.get(nextRequest);

		const { next, previous, results } = response.data;

		const promises = results.map(async (pokemon: any) => {
			const pokemonResponseDetails = await axios.get(pokemon.url);
			const { id, name, types } = pokemonResponseDetails.data;
			const pokemonDataApi: IPokemonPokedex = {
				name: name,
				id: id,
				types: types.map((type: any) => {
					return { name: type.type.name };
				}),
				sprite: PokemonImgByPokemonId[id]
			};
			return pokemonDataApi;
		});
		return {
			results: await Promise.all(promises),
			next,
			previous
		};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

export async function getPreviousPokemons(
	previousRequest: string
): Promise<IPokemonRequest> {
	try {
		const response = await axios.get(previousRequest);

		const { next, previous, results } = response.data;

		const promises = results.map(async (pokemon: any) => {
			const pokemonResponseDetails = await axios.get(pokemon.url);
			const { id, name, types } = pokemonResponseDetails.data;
			const pokemonDataApi: IPokemonPokedex = {
				name: name,
				id: id,
				types: types.map((type: any) => {
					return { name: type.type.name };
				}),
				sprite: PokemonImgByPokemonId[id]
			};
			return pokemonDataApi;
		});
		return {
			results: await Promise.all(promises),
			next,
			previous
		};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

export async function getPokemon(pokemonId: number): Promise<IPokemonEntity> {
	try {
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${pokemonId}`
		);
		const { id, name, stats, types } = response.data;

		return {
			ability: {
				name: 'Overgrow',
				description:
					'Powers up Grass-type moves when the Pokémon’s HP is low.'
			},
			moves: [
				{
					name: 'Tackle',
					type: 'Normal',
					category: 'Physical',
					power: 40,
					accuracy: 100,
					pp: 35,
					description:
						'A physical attack in which the user charges and slams into the target with its whole body.'
				}
			],
			stats: [
				{
					name: 'hp',
					value: stats[0].base_stat,
					max: stats[0].base_stat
				}
			],
			nature: 'Adamant',
			isShiny: false,
			item: {
				name: 'None',
				description: 'No item',
				image: '/items/none.png'
			},
			level: 1,
			sprite: PokemonImgByPokemonId[id],
			name: name,
			id: id,
			types: types.map((type: any) => {
				return { name: type.type.name };
			})
		};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}
