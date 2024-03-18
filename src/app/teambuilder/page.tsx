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
import { addTeam, deleteTeam } from '../store/features/teamsSlice';

const TeamBuilder = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [apiMessage, setApiMessage] = useState<string>('');
	const teams = useSelector((state: RootState) => state.teams.teams);

	const handleAddTeam = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { value } = e.target[0];
		const newTeam: Team = { name: value };
		try {
			const response = await axios.post(
				'http://localhost:8080/api/v1/teams',
				newTeam
			);
			dispatch(addTeam(newTeam));
			setApiMessage(response.data);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setApiMessage(err.response.data);
			}
		}
	};

	const handleDeleteTeam = async (team: Team) => {
		try {
			const response = await axios.delete(
				'http://localhost:8080/api/v1/teams/' + team.name
			);
			dispatch(deleteTeam(team));
			setApiMessage(response.data);
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
			<form onSubmit={handleAddTeam}>
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
						<button onClick={() => handleDeleteTeam(team)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TeamBuilder;
