'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Rooms = () => {
	const router = useRouter();

	useEffect(() => {
		const playerPokemon = {
			name: 'Blastoise',
			stats: [
				{ name: 'hp', value: 362, max: 362 },
				{ name: 'attack', value: 291, max: 291 },
				{ name: 'speed', value: 280, max: 280 }
			],
			moves: [
				{ name: 'surf', power: 95 },
				{ name: 'hydro pump', power: 120 },
				{ name: 'ice beam', power: 90 },
				{ name: 'bite', power: 60 }
			]
		};
		const opponentPokemon = {
			name: 'Charizard',
			stats: [
				{ name: 'hp', value: 360, max: 360 },
				{ name: 'attack', value: 293, max: 293 },
				{ name: 'speed', value: 328, max: 328 }
			],
			moves: [
				{ name: 'flamethrower', power: 95 },
				{ name: 'fire blast', power: 120 },
				{ name: 'wing attack', power: 60 },
				{ name: 'slash', power: 70 }
			]
		};

		localStorage.setItem('playerPokemon', JSON.stringify(playerPokemon));
		localStorage.setItem('opponentPokemon', JSON.stringify(opponentPokemon));
	}, []);
	return (
		<div>
			<Link href={'/'}>Go back</Link>
			<h1>Rooms</h1>
			<button onClick={() => router.push('/battle')}>Battle</button>
		</div>
	);
};

export default Rooms;
