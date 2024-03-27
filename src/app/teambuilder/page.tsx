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
