'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Types
import Pokemon from '../../../types/Pokemon';

const pokemonBuilder = ({ params }: { params: { name: string } }) => {
	const decodedName = decodeURIComponent(params.name);
	const team = useSelector((state: RootState) =>
		state.teams.teams.find(team => team.name === decodedName)
	);
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
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
					const { id, name, types } = pokemonResponseDetails.data;
					return { id, name, types };
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

	return (
		<div>
			<h1>Pokemon Builder</h1>
			<Link href="/teambuilder">Back</Link>
			{team ? (
				<div>
					<div>
						<p>Team: {team.name}</p>
						<p>Update your team here</p>
					</div>

					<h1>Pokemons: </h1>
					{pokemons ? (
						<ul>
							{pokemons.map(pokemon => (
								<li key={pokemon.id}>
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
					) : (
						<p>Loading...</p>
					)}

					<div>
						<span>Page: {page}</span>
						{page > 1 && (
							<button onClick={() => setPage(page - 1)}>Previous</button>
						)}
						{page < 10 && (
							<button onClick={() => setPage(page + 1)}>Next</button>
						)}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
export default pokemonBuilder;
