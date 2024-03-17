'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Team from '../../../types/Team';
import Link from 'next/link';

const pokemonBuilder = ({ params }: { params: { name: string } }) => {
	const [team, setTeam] = useState<Team>();

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/api/v1/teams/${params.name}`
				);
				setTeam(response.data);
			} catch (err) {
				if (axios.isAxiosError(err)) {
					console.error(err.response.data);
				}
			}
		})();
	}, [params.name]);

	return (
		<div>
			<h1>Pokemon Builder</h1>
			<Link href="/teambuilder">Back</Link>
			{team ? (
				<div>
					<p>Team: {team.name}</p>
					<p>Update your team here</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
export default pokemonBuilder;
