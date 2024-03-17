'use client';
import { FormEvent, useState } from 'react';
import axios from 'axios';

// Types
import Team from '../../types/Team';

const TeamBuilding = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [apiMessage, setApiMessage] = useState<string>('');
	const addTeam = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { value } = e.target[0];
		const newTeam: Team = { name: value };
		console.log(newTeam);
		try {
			await axios
				.post('http://localhost:8080/api/v1/teams', newTeam)
				.then(res => {
					setTeams([...teams, newTeam]);
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
			<h1>Team Builder</h1>
			Create a team:{' '}
			<form onSubmit={addTeam}>
				<input type="text" placeholder="Team name" name="team" />
				<button>Create</button>
				{apiMessage && <p>{apiMessage}</p>}
			</form>
			Your teams:
			<ul>
				{teams.map(team => (
					<li key={team.name}>{team.name}</li>
				))}
			</ul>
		</div>
	);
};

export default TeamBuilding;
