'use client';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Types
import Team from '../../types/Team';

// Slices
import { addTeam } from '../store/features/teamsSlice';

const TeamBuilder = () => {
	const router = useRouter();
	const [apiMessage, setApiMessage] = useState<string>('');
	const teams = useSelector((state: RootState) => state.teams.teams);
	const dispatch = useDispatch();

	const createTeam = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { value } = e.target[0];
		const newTeam: Team = { name: value };
		try {
			await axios
				.post('http://localhost:8080/api/v1/teams', newTeam)
				.then(res => {
					dispatch(addTeam(newTeam));
					setApiMessage(res.data);
				});
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setApiMessage(err.response.data);
			}
		}
	};
	return (
		<div>
			<Link href="/">Home</Link>
			<h1>Team Builder</h1>
			Create a team:{' '}
			<form onSubmit={createTeam}>
				<input type="text" placeholder="Team name" name="team" />
				<button>Create</button>
				{apiMessage && <p>{apiMessage}</p>}
			</form>
			Your teams:
			<ul>
				{teams.map(team => (
					<li key={team.name}>
						{team.name}{' '}
						<button
							onClick={() => router.push('/teambuilder/' + team.name)}
						>
							Update
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TeamBuilder;
