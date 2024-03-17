'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const pokemonBuilder = ({ params }: { params: { name: string } }) => {
	const decodedName = decodeURIComponent(params.name);
	const team = useSelector((state: RootState) =>
		state.teams.teams.find(team => team.name === decodedName)
	);

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
