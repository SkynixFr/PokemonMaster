'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Rooms = () => {
	const router = useRouter();

	useEffect(() => {
		const playerPokemon = {
			name: 'Blastoise',
			stats: [
				{ name: 'hp', value: 100, max: 100 },
				{ name: 'attack', value: 100, max: 100 }
			],
			moves: [{ name: 'surf', power: 25 }]
		};
		const opponentPokemon = {
			name: 'Charizard',
			stats: [
				{ name: 'hp', value: 100, max: 100 },
				{ name: 'attack', value: 100, max: 100 }
			],
			moves: [{ name: 'flamethrower', power: 25 }]
		};

		console.log('Creating player and opponent pokemon');
		console.log(playerPokemon, opponentPokemon);

		localStorage.setItem('playerPokemon', JSON.stringify(playerPokemon));
		localStorage.setItem('opponentPokemon', JSON.stringify(opponentPokemon));

		console.log('Setting player and opponent pokemon in store');
	}, []);
	return (
		<div>
			<h1>Rooms</h1>
			<button onClick={() => router.push('/battle')}>Battle</button>
		</div>
	);
};

export default Rooms;
