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
					const { id, name, types, sprites } = pokemonResponseDetails.data;
					return { id, name, types, sprites };
				});
				const resolvedPromises = await Promise.all(promises);
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

	const handleAddPokemonTeam = async (pokemonName, team) => {
		try {
			const response = await axios.post(
				`http://localhost:8080/api/v1/teams/${team.name}/pokemons/${pokemonName}`
			);
			setApiMessage(response.data);
			const updatedPokemons = [...team.pokemons, { name: pokemonName }];
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
								{team.pokemons.map((pokemon: Object, index) => (
									<li key={index}>{pokemon.name}</li>
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
									{pokemon.types.map((type: any) => (
										<li key={type.slot}>{type.type.name}</li>
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
								{pokemonData.types.map((type: any) => (
									<li key={type.slot}>{type.type.name}</li>
								))}
							</ul>
							<button
								onClick={() =>
									handleAddPokemonTeam(pokemonData.name, team)
								}
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
