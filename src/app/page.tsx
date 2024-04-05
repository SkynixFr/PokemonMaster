'use client';
import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
	setOpponentPokemon,
	setPlayerPokemon
} from '../store/features/battleSlice';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const opponentPokemon = {
			name: 'charizard',
			stats: [
				{ name: 'hp', value: 100, max: 100 },
				{ name: 'attack', value: 100, max: 100 }
			],
			moves: [{ name: 'flamethrower', power: 25 }]
		};
		const playerPokemon = {
			name: 'blastoise',
			stats: [
				{ name: 'hp', value: 100, max: 100 },
				{ name: 'attack', value: 100, max: 100 }
			],
			moves: [{ name: 'surf', power: 25 }]
		};

		dispatch(setOpponentPokemon(opponentPokemon));
		dispatch(setPlayerPokemon(playerPokemon));
	}, []);
	return (
		<div>
			<h1>Hello World</h1>
			<ul>
				<li>
					<Link href="/teambuilder">Team builder</Link>
				</li>
				<li>
					<Link href="/battle">Battle</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
