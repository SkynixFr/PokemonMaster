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
				{
					name: 'blizzard',
					power: 110,
					accuracy: 70,
					pp: 5,
					meta: {
						ailment: 'freeze',
						drain: 0,
						healing: 0,
						critRate: 0,
						priority: 0,
						effectChance: 10,
						flinchChance: 0,
						statChance: 0,
						minHits: 0,
						maxHits: 0,
						minTurns: 0,
						maxTurns: 0
					},
					type: 'ice',
					category: 'special',
					description: 'Has a 10% chance to freeze the target.',
					learnedBy: ['squirtle', 'wartortle', 'blastoise'],
					_class:
						'org.example.pokemonmasterapi.repositories.model.MoveEntity'
				},
				{
					name: 'toxic',
					power: 0,
					accuracy: 90,
					pp: 10,
					meta: {
						ailment: 'poison',
						drain: 0,
						healing: 0,
						critRate: 0,
						priority: 0,
						effectChance: 0,
						flinchChance: 0,
						statChance: 0,
						minHits: 0,
						maxHits: 0,
						minTurns: 15,
						maxTurns: 15
					},
					type: 'poison',
					category: 'status',
					description:
						'Badly poisons the target, inflicting more damage every turn.',
					learnedBy: ['bulbasaur', 'ivysaur', 'venusaur'],
					_class:
						'org.example.pokemonmasterapi.repositories.model.MoveEntity'
				},
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
				{
					name: 'hypnosis',
					power: 0,
					accuracy: 60,
					pp: 20,
					meta: {
						ailment: 'sleep',
						drain: 0,
						healing: 0,
						critRate: 0,
						priority: 0,
						effectChance: 0,
						flinchChance: 0,
						statChance: 0,
						minHits: 0,
						maxHits: 0,
						minTurns: 2,
						maxTurns: 4
					},
					type: 'psychic',
					category: 'status',
					description: 'Puts the target to sleep.',
					learnedBy: ['vulpix', 'ninetales', 'zubat'],
					_class:
						'org.example.pokemonmasterapi.repositories.model.MoveEntity'
				},
				{ name: 'wing attack', power: 60 },
				{
					name: 'toxic',
					power: 0,
					accuracy: 90,
					pp: 10,
					meta: {
						ailment: 'poison',
						drain: 0,
						healing: 0,
						critRate: 0,
						priority: 0,
						effectChance: 0,
						flinchChance: 0,
						statChance: 0,
						minHits: 0,
						maxHits: 0,
						minTurns: 15,
						maxTurns: 15
					},
					type: 'poison',
					category: 'status',
					description:
						'Badly poisons the target, inflicting more damage every turn.',
					learnedBy: ['bulbasaur', 'ivysaur', 'venusaur'],
					_class:
						'org.example.pokemonmasterapi.repositories.model.MoveEntity'
				}
			]
		};

		localStorage.setItem('playerPokemon', JSON.stringify(playerPokemon));
		localStorage.setItem('opponentPokemon', JSON.stringify(opponentPokemon));
	}, []);
	return (
		<div style={{ margin: '50px 0 0 0' }}>
			<Link href={'/'}>Go back</Link>
			<h1>Rooms</h1>
			<button onClick={() => router.push('/battle')}>Battle</button>
		</div>
	);
};

export default Rooms;
