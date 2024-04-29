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
				{
					id: 1,
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
					learnedBy: [
						'vulpix',
						'ninetales',
						'zubat',
						'meowth',
						'persian',
						'psyduck',
						'poliwag',
						'poliwhirl',
						'poliwrath',
						'ponyta',
						'rapidash',
						'gastly',
						'haunter',
						'gengar',
						'drowzee',
						'hypno',
						'exeggcute',
						'exeggutor',
						'mr-mime',
						'mew',
						'hoothoot',
						'noctowl',
						'politoed',
						'yanma',
						'stantler',
						'ralts',
						'kirlia',
						'gardevoir',
						'spinda',
						'lunatone',
						'solrock',
						'feebas',
						'milotic',
						'chimecho',
						'drifloon',
						'glameow',
						'purugly',
						'chingling',
						'bronzor',
						'bronzong',
						'mime-jr',
						'spiritomb',
						'yanmega',
						'gallade',
						'darkrai',
						'patrat',
						'watchog',
						'munna',
						'musharna',
						'pidove',
						'sigilyph',
						'gothita',
						'gothorita',
						'gothitelle',
						'fennekin',
						'braixen',
						'delphox',
						'inkay',
						'malamar',
						'sandygast',
						'palossand',
						'lunala',
						'xurkitree',
						'blacephalon',
						'orbeetle',
						'mr-rime',
						'wyrdeer',
						'flittle',
						'iron-valiant',
						'gengar-mega',
						'gardevoir-mega',
						'vulpix-alola',
						'ninetales-alola',
						'meowth-alola',
						'persian-alola',
						'exeggutor-alola',
						'ponyta-galar',
						'mr-mime-galar',
						'articuno-galar'
					],
					_class:
						'org.example.pokemonmasterapi.repositories.model.MoveEntity'
				}
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
