'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Type } from '../../../../src/back/classes/typeEffectiveness';

const Rooms = () => {
	const router = useRouter();

	useEffect(() => {
		const blastoise = {
			name: 'Blastoise',
			stats: [
				{ name: 'hp', value: 362, max: 362 },
				{ name: 'attack', value: 291, max: 291 },
				{ name: 'speed', value: 280, max: 280 }
			],
			moves: [
				{
					name: 'thunder-wave',
					power: 0,
					accuracy: 90,
					pp: 20,
					meta: {
						ailment: 'paralysis',
						drain: 0,
						healing: 0,
						critRate: 0,
						priority: 0,
						effectChance: 0,
						flinchChance: 0,
						statChance: 0,
						minHits: 0,
						maxHits: 0,
						minTurns: 0,
						maxTurns: 0
					},
					type: Type.Electric,
					category: 'status',
					description: 'Paralyzes the target.',
					learnedBy: ['rattata'],
					target: 'selected-pokemon'
				},
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
					type: Type.Ice,
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
					type: Type.Poison,
					category: 'status',
					description:
						'Badly poisons the target, inflicting more damage every turn.',
					learnedBy: ['bulbasaur', 'ivysaur', 'venusaur'],
					_class:
						'org.example.pokemonmasterapi.repositories.model.MoveEntity'
				},
				{ name: 'bite', power: 60, pp: 25, accuracy: 100, type: Type.Dark }
			],
			types: [Type.Water, Type.Ice]
		};
		const charizard = {
			name: 'Charizard',
			stats: [
				{ name: 'hp', value: 360, max: 360 },
				{ name: 'attack', value: 293, max: 293 },
				{ name: 'speed', value: 328, max: 328 }
			],
			moves: [
				{
					name: 'flamethrower',
					power: 90,
					accuracy: 100,
					pp: 15,
					meta: {
						ailment: 'burn',
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
					type: Type.Fire,
					category: 'special',
					description: 'Has a 10% chance to burn the target.',
					learnedBy: ['charmander', 'charmeleon', 'charizard'],
					target: 'selected-pokemon'
				},
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
					type: Type.Psychic,
					category: 'status',
					description: 'Puts the target to sleep.',
					learnedBy: ['vulpix', 'ninetales', 'zubat']
				},
				{
					name: 'supersonic',
					power: 0,
					accuracy: 100,
					pp: 20,
					meta: {
						ailment: 'confusion',
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
						maxTurns: 5
					},
					type: Type.Normal,
					category: 'status',
					description: 'Confuses the target.',
					learnedBy: ['butterfree'],
					target: 'selected-pokemon'
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
					type: Type.Poison,
					category: 'status',
					description:
						'Badly poisons the target, inflicting more damage every turn.',
					learnedBy: ['bulbasaur', 'ivysaur', 'venusaur'],
					_class:
						'org.example.pokemonmasterapi.repositories.model.MoveEntity'
				}
			],
			types: [Type.Fire, Type.Flying]
		};

		const playerTeam = [blastoise, charizard];
		const opponentTeam = [charizard, blastoise];

		localStorage.setItem('playerPokemon', JSON.stringify(blastoise));
		localStorage.setItem('opponentPokemon', JSON.stringify(charizard));
		localStorage.setItem('playerTeam', JSON.stringify(playerTeam));
		localStorage.setItem('opponentTeam', JSON.stringify(opponentTeam));
	}, []);
	return (
		<div style={{ margin: '100px 0 0 10px' }}>
			<button onClick={() => router.push('/battle')}>Battle</button>
		</div>
	);
};

export default Rooms;
