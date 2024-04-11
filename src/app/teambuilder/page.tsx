'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Components
import CustomImage from '../../front/components/custom/customImage';

// Interfaces
import IAvatar from '../../interfaces/IAvatar';
import ITeam, { ITeamEntity } from '../../interfaces/ITeam';
import ITeamResponse from '../../interfaces/ITeam';
import PokemonList from '../../front/components/teambuilder/pokemonList';

interface TeamBuilderProps {
	avatars: IAvatar[];
	teams: ITeam[];
	createTeam: (team: ITeamEntity) => Promise<ITeamResponse>;
	deleteTeam: (teamId: string) => Promise<void>;
}

const TeamBuilder = ({
	avatars,
	teams,
	createTeam,
	deleteTeam
}: TeamBuilderProps) => {
	const router = useRouter();
	const [teamName, setTeamName] = useState<string>('');
	const [selectedAvatar, setSelectedAvatar] = useState<IAvatar>(null);
	const [apiMessage, setApiMessage] = useState<string>('');

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTeam: ITeamEntity = {
			name: teamName,
			avatarId: selectedAvatar.id
		};

		await createTeam(newTeam);
	};

	const handleDelete = async (teamId: string) => {
		await deleteTeam(teamId);
	};

	if (!avatars || !teams) return <div>Loading...</div>;

	return (
		<div>
			<Link href="/">Go back </Link>
			<h1>Team Builder</h1>
			<form onSubmit={handleCreate}>
				<label htmlFor="teamName">Team Name</label>
				<input
					type="text"
					id="teamName"
					name="teamName"
					onChange={e => setTeamName(e.target.value)}
				/>
				<h3>Avatars</h3>
				<ul
					style={{
						display: 'flex'
					}}
				>
					{avatars.map((avatar: IAvatar) => (
						<li
							key={avatar.id}
							onClick={() => setSelectedAvatar(avatar)}
							style={
								selectedAvatar?.url === avatar.url
									? {
											transform: 'scale(1.3)',
											transition: 'all 0.5s'
										}
									: { border: 'none' }
							}
						>
							<span>{avatar.name}</span>
							<CustomImage
								src={avatar.url}
								alt={`Avatar ${avatar.name}`}
								priority={true}
								objectFit={'contain'}
								width={150}
								height={150}
							/>
						</li>
					))}
				</ul>
				<button type="submit">Create</button>
			</form>
			{apiMessage && <p>{apiMessage}</p>}
			<div>
				<h2>Your teams:</h2>
				<ul>
					{teams.map((team: ITeamResponse) => (
						<li key={team.id}>
							<span>{team.name}</span>
							<CustomImage
								src={team.avatar.url}
								alt={`Avatar ${team.avatar.name}`}
								priority={true}
								objectFit={'contain'}
								width={150}
								height={150}
							/>

							{team.pokemons === null ? (
								<span>No pokemons in this team</span>
							) : (
								<PokemonList pokemons={team.pokemons} />
							)}

							<button
								onClick={() =>
									router.push(`/pokemonbuilder/${team.id}`)
								}
							>
								Update
							</button>
							<button onClick={() => handleDelete(team.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TeamBuilder;

// 'use client';
// import { FormEvent, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
//
// // Types
// import Team from '../../interfaces/Team';
//
// // Slices
// import { addTeam, deleteTeam } from '../../store/features/teamsSlice';
//
// // Components
// import Avatar from '../../front/components/avatar';
//
// const TeamBuilder = () => {
// 	const router = useRouter();
// 	const dispatch = useDispatch();
// 	const [apiMessage, setApiMessage] = useState<string>('');
// 	const [avatarUrl, setAvatarUrl] = useState<string>('');
// 	const teams = useSelector((state: RootState) => state.teams.teams);
//
// 	const handleAddTeam = async (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		const { value } = e.target[0];
// 		const newTeam: Team = { name: value, avatar: avatarUrl };
// 		try {
// 			const response = await axios.post(
// 				'http://localhost:8080/api/v1/teams',
// 				newTeam
// 			);
// 			dispatch(addTeam(newTeam));
// 			setApiMessage(response.data);
// 		} catch (err) {
// 			if (axios.isAxiosError(err)) {
// 				setApiMessage(err.response.data);
// 			}
// 		}
// 	};
//
// 	const handleDeleteTeam = async (team: Team) => {
// 		try {
// 			const response = await axios.delete(
// 				'http://localhost:8080/api/v1/teams/' + team.name
// 			);
// 			dispatch(deleteTeam(team));
// 			setApiMessage(response.data);
// 		} catch (err) {
// 			if (axios.isAxiosError(err)) {
// 				setApiMessage(err.response.data);
// 			}
// 		}
// 	};
//
// 	return (
// 		<div>
// 			<Link href="/">Home</Link>
// 			<h1>Team Builder</h1>
// 			Create a team:{' '}
// 			<form onSubmit={handleAddTeam}>
// 				<input type="text" placeholder="Team name" name="team" />
// 				<div>
// 					<h3>Avatars</h3>
// 					<ul>
// 						<li
// 							onClick={() => setAvatarUrl('/images/avatars/cynthia.png')}
// 							style={
// 								avatarUrl === '/images/avatars/cynthia.png'
// 									? { border: '2px solid red' }
// 									: { border: 'none' }
// 							}
// 						>
// 							<Avatar
// 								avatarUrl="/images/avatars/cynthia.png"
// 								altText="Cynthia"
// 							/>
// 						</li>
// 						<li
// 							onClick={() => setAvatarUrl('/images/avatars/blue.png')}
// 							style={
// 								avatarUrl === '/images/avatars/blue.png'
// 									? { border: '2px solid red' }
// 									: { border: 'none' }
// 							}
// 						>
// 							<Avatar
// 								avatarUrl="/images/avatars/blue.png"
// 								altText="Cynthia"
// 							/>
// 						</li>
// 						<li
// 							onClick={() => setAvatarUrl('/images/avatars/red.png')}
// 							style={
// 								avatarUrl === '/images/avatars/red.png'
// 									? { border: '2px solid red' }
// 									: { border: 'none' }
// 							}
// 						>
// 							<Avatar
// 								avatarUrl="/images/avatars/red.png"
// 								altText="Cynthia"
// 							/>
// 						</li>
// 					</ul>
// 				</div>
// 				<button>Create</button>
// 				{apiMessage && <p>{apiMessage}</p>}
// 			</form>
// 			Your teams:
// 			<ul>
// 				{teams.map(team => (
// 					<li key={team.name}>
// 						{team.name}{' '}
// 						<button
// 							onClick={() => router.push('/teambuilder/' + team.name)}
// 						>
// 							Update
// 						</button>
// 						<button onClick={() => handleDeleteTeam(team)}>Delete</button>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };
//
// export default TeamBuilder;
