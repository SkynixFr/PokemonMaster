'use client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

// Slices
import { updateTeam } from '../../store/features/teamsSlice';

// Types
import Pokemon from '../../../types/Pokemon';
import Team from '../../../types/Team';
import Avatar from '../../components/avatar';

const pokemonBuilder = ({ params }: { params: { name: string } }) => {
	const dispatch = useDispatch();
	const decodedName = decodeURIComponent(params.name);
	const team = useSelector((state: RootState) =>
		state.teams.teams.find(team => team.name === decodedName)
	);
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [pokemonData, setPokemonData] = useState<Pokemon>(null);
	const [apiMessage, setApiMessage] = useState<string>('');
	const [page, setPage] = useState<number>(1);
	const limit = 9;

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${limit * (page - 1)}`
				);
				const promises = response.data.results.map(async (pokemon: any) => {
					const pokemonResponseDetails = await axios.get(pokemon.url);
					const { id, name, types, sprites, stats } =
						pokemonResponseDetails.data;

					const pokemonDataApi: Pokemon = {
						name,
						id,
						types: types.map(type => {
							return { name: type.type.name };
						}),
						sprites: {
							back_default: sprites.back_default,
							back_female: sprites.back_female,
							back_shiny: sprites.back_shiny,
							back_shiny_female: sprites.back_shiny_female,
							front_default: sprites.front_default,
							front_female: sprites.front_female,
							front_shiny: sprites.front_shiny,
							front_shiny_female: sprites.front_shiny_female,
							showdown: {
								back_default: sprites.other['showdown'].back_default,
								back_female: sprites.other['showdown'].back_female,
								back_shiny: sprites.other['showdown'].back_shiny,
								back_shiny_female:
									sprites.other['showdown'].back_shiny_female,
								front_default: sprites.other['showdown'].front_default,
								front_female: sprites.other['showdown'].front_female,
								front_shiny: sprites.other['showdown'].front_shiny,
								front_shiny_female:
									sprites.other['showdown'].front_shiny_female
							}
						},
						stats: {
							hp: stats[0].base_stat,
							attack: stats[1].base_stat,
							defense: stats[2].base_stat,
							spAttack: stats[3].base_stat,
							spDefense: stats[4].base_stat,
							speed: stats[5].base_stat
						}
					};

					return pokemonDataApi;
				});
				const resolvedPromises = await Promise.all(promises);
				console.log(resolvedPromises);
				setPokemons(resolvedPromises);
			} catch (err) {
				if (axios.isAxiosError(err)) {
					console.error(err);
				}
			}
		})();
	}, [page]);

	const handlePokemonData = (id: number) => {
		const pokemon = pokemons.find(pokemon => pokemon.id === id);
		setPokemonData(pokemon);
	};

	const handleAddPokemonTeam = async (pokemon, team) => {
		try {
			const response = await axios.post(
				`http://localhost:8080/api/v1/teams/${team.name}/pokemons/${pokemon.name}`,
				pokemon
			);
			setApiMessage(response.data);
			const updatedPokemons: Pokemon[] = [...team.pokemons, pokemon];
			const newTeam: Team = { ...team, pokemons: updatedPokemons };
			dispatch(updateTeam(newTeam));
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.error(err);
			}
		}
	};

	return (
		<div>
			<h1>Pokemon Builder</h1>
			<Link href="/teambuilder">Back</Link>
			{team ? (
				<div>
					<div>
						<p>Team: {team.name}</p>
						<p>
							Avatar:{' '}
							<Avatar avatarUrl={team.avatar} altText="Cynthia" />
						</p>
						<p>
							Pokemons:
							<ul>
								{team.pokemons &&
									team.pokemons.map(pokemon => (
										<li key={pokemon.id}>{pokemon.name}</li>
									))}
							</ul>
						</p>
						<p>Update your team here</p>
					</div>

					<h1>Pokemons: </h1>

					<ul>
						{pokemons.map(pokemon => (
							<li
								key={pokemon.id}
								onClick={() => handlePokemonData(pokemon.id)}
								style={
									pokemonData?.id === pokemon.id
										? { backgroundColor: 'lightblue' }
										: {}
								}
							>
								<Image
									src={pokemon.sprites['front_default']}
									alt="Pokemon image"
									priority={true}
									width={50}
									height={50}
								/>
								<span>#{pokemon.id} </span>
								{pokemon.name}
								<ul>
									{pokemon.types.map((type, index) => (
										<li key={index}>{type.name}</li>
									))}
								</ul>
							</li>
						))}
					</ul>

					<div>
						<span>Page: {page}</span>
						{page > 1 && (
							<button onClick={() => setPage(page - 1)}>Previous</button>
						)}
						{page < 10 && (
							<button onClick={() => setPage(page + 1)}>Next</button>
						)}
					</div>

					{pokemonData && (
						<div>
							<h1>{pokemonData.name}</h1>
							<Image
								src={pokemonData.sprites['front_default']}
								alt="Pokemon image"
								priority={true}
								width={200}
								height={200}
							/>
							<ul>
								{pokemonData.types.map((type, index) => (
									<li key={index}>{type.name}</li>
								))}
							</ul>
							<button
								onClick={() => handleAddPokemonTeam(pokemonData, team)}
							>
								Add to team
							</button>
						</div>
					)}

					{apiMessage && <p>{apiMessage}</p>}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
export default pokemonBuilder;
