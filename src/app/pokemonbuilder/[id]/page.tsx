import Link from 'next/link';
import Team from '../../../front/components/pokemonbuilder/team';
import axios from 'axios';
import IPokemon from '../../../interfaces/IPokemon';
import { PokemonImgByPokemonId } from '../../../front/utils/pokemonImgByPokemonId';
import { getTeam } from '../../../front/actions/teams.actions';

async function getPokemons(): Promise<IPokemon[]> {
	try {
		const response = await axios.get(
			'https://pokeapi.co/api/v2/pokemon/?limit=9,offset=0'
		);

		const promises = response.data.results.map(async (pokemon: any) => {
			const pokemonResponseDetails = await axios.get(pokemon.url);
			const { id, name, stats, types } = pokemonResponseDetails.data;
			const pokemonDataApi: IPokemon = {
				name: name,
				id: id,
				types: [
					{
						name: types[0].type.name
					}
				],
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
				sprite: PokemonImgByPokemonId[id]
			};
			return pokemonDataApi;
		});
		return await Promise.all(promises);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response?.data;
		}
	}
}

const PokemonBuilder = async ({ params }: { params: { id: string } }) => {
	const teamData = await getTeam(params.id);
	const pokemonData = getPokemons();
	const [team, pokemons] = await Promise.all([teamData, pokemonData]);
	return (
		<div>
			{team && pokemons ? (
				<>
					<Link href={'/teambuilder'}>Go back</Link>
					<Team team={team} pokemons={pokemons} />
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};

export default PokemonBuilder;
// 'use client';
// import Link from 'next/link';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../../store/store';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
//
// // Slices
// import { updateTeam } from '../../../store/features/teamsSlice';
//
// // Types
// import Pokemon from '../../../interfaces/Pokemon';
// import Team from '../../../interfaces/Team';
// import Avatar from '../../../front/components/avatar';
//
// const pokemonBuilder = ({ params }: { params: { name: string } }) => {
// 	const dispatch = useDispatch();
// 	const decodedName = decodeURIComponent(params.name);
// 	const team = useSelector((state: RootState) =>
// 		state.teams.teams.find(team => team.name === decodedName)
// 	);
// 	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
// 	const [pokemonData, setPokemonData] = useState<Pokemon>(null);
// 	const [apiMessage, setApiMessage] = useState<string>('');
// 	const [page, setPage] = useState<number>(1);
// 	const limit = 9;
//
// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${limit * (page - 1)}`
// 				);
// 				const promises = response.data.results.map(async (pokemon: any) => {
// 					const pokemonResponseDetails = await axios.get(pokemon.url);
// 					const { id, name, types, stats } = pokemonResponseDetails.data;
//
// 					const pokemonDataApi: Pokemon = {
// 						name,
// 						id,
// 						types: types.map(type => {
// 							return { name: type.type.name };
// 						}),
// 						stats: {
// 							hp: stats[0].base_stat,
// 							attack: stats[1].base_stat,
// 							defense: stats[2].base_stat,
// 							spAttack: stats[3].base_stat,
// 							spDefense: stats[4].base_stat,
// 							speed: stats[5].base_stat
// 						}
// 					};
//
// 					return pokemonDataApi;
// 				});
// 				const resolvedPromises = await Promise.all(promises);
// 				console.log(resolvedPromises);
// 				setPokemons(resolvedPromises);
// 			} catch (err) {
// 				if (axios.isAxiosError(err)) {
// 					console.error(err);
// 				}
// 			}
// 		})();
// 	}, [page]);
// 	const handlePokemonData = (id: number) => {
// 		const pokemon = pokemons.find(pokemon => pokemon.id === id);
// 		setPokemonData(pokemon);
// 	};
//
// 	const handleAddPokemonTeam = async (pokemon, team) => {
// 		try {
// 			const response = await axios.post(
// 				`http://localhost:8080/api/v1/teams/${team.name}/pokemons/${pokemon.name}`,
// 				pokemon
// 			);
// 			setApiMessage(response.data);
// 			const updatedPokemons: Pokemon[] = [...team.pokemons, pokemon];
// 			const newTeam: Team = { ...team, pokemons: updatedPokemons };
// 			dispatch(updateTeam(newTeam));
// 		} catch (err) {
// 			if (axios.isAxiosError(err)) {
// 				console.error(err);
// 			}
// 		}
// 	};
//
// 	return (
// 		<div>
// 			<h1>Pokemon Builder</h1>
// 			<Link href="/teambuilder">Back</Link>
// 			{team ? (
// 				<div>
// 					<div>
// 						<p>Team: {team.name}</p>
// 						<p>
// 							Avatar:{' '}
// 							<Avatar avatarUrl={team.avatar} altText="Cynthia" />
// 						</p>
// 						<p>
// 							Pokemons:
// 							<ul>
// 								{team.pokemons &&
// 									team.pokemons.map(pokemon => (
// 										<li key={pokemon.id}>{pokemon.name}</li>
// 									))}
// 							</ul>
// 						</p>
// 						<p>Update your team here</p>
// 					</div>
//
// 					<h1>Pokemons: </h1>
//
// 					<ul>
// 						{pokemons.map(pokemon => (
// 							<li
// 								key={pokemon.id}
// 								onClick={() => handlePokemonData(pokemon.id)}
// 								style={
// 									pokemonData?.id === pokemon.id
// 										? { backgroundColor: 'lightblue' }
// 										: {}
// 								}
// 							>
// 								<span>#{pokemon.id} </span>
// 								{pokemon.name}
// 								<ul>
// 									{pokemon.types.map((type, index) => (
// 										<li key={index}>{type.name}</li>
// 									))}
// 								</ul>
// 							</li>
// 						))}
// 					</ul>
//
// 					<div>
// 						<span>Page: {page}</span>
// 						{page > 1 && (
// 							<button onClick={() => setPage(page - 1)}>Previous</button>
// 						)}
// 						{page < 10 && (
// 							<button onClick={() => setPage(page + 1)}>Next</button>
// 						)}
// 					</div>
//
// 					{pokemonData && (
// 						<div>
// 							<h1>{pokemonData.name}</h1>
//
// 							<ul>
// 								{pokemonData.types.map((type, index) => (
// 									<li key={index}>{type.name}</li>
// 								))}
// 							</ul>
// 							<button
// 								onClick={() => handleAddPokemonTeam(pokemonData, team)}
// 							>
// 								Add to team
// 							</button>
// 						</div>
// 					)}
//
// 					{apiMessage && <p>{apiMessage}</p>}
// 				</div>
// 			) : (
// 				<p>Loading...</p>
// 			)}
// 		</div>
// 	);
// };
// export default pokemonBuilder;
