'use client';
import { ReactNode, useEffect, useState } from 'react';

// Classes
import BattleClass from '../../back/classes/battle';
import Pokemon from '../../back/classes/pokemon';
import Stat from '../../back/classes/stat';
import Move from '../../back/classes/move';

// Pages
import Battle from '../../app/battle/page';

const BattleProvider = ({ children }: { children: ReactNode }) => {
	const [battle, setBattle] = useState<BattleClass>(null);

	useEffect(() => {
		const storedOpponentPokemon = JSON.parse(
			localStorage.getItem('opponentPokemon')
		);
		const storedPlayerPokemon = JSON.parse(
			localStorage.getItem('playerPokemon')
		);

		if (storedOpponentPokemon && storedPlayerPokemon) {
			const battle = new BattleClass(
				new Pokemon(
					storedPlayerPokemon.name,
					storedPlayerPokemon.stats.map(
						(stat: Stat) => new Stat(stat.name, stat.value, stat.max)
					),
					storedPlayerPokemon.moves.map(
						(move: Move) =>
							new Move(move.name, move.power, move.pp, move.meta)
					)
				),
				new Pokemon(
					storedOpponentPokemon.name,
					storedOpponentPokemon.stats.map(
						(stat: Stat) => new Stat(stat.name, stat.value, stat.max)
					),
					storedOpponentPokemon.moves.map(
						(move: Move) =>
							new Move(move.name, move.power, move.pp, move.meta)
					)
				)
			);
			setBattle(battle);
		} else {
			console.error('No stored pokemon found');
		}
	}, []);

	return <Battle battle={battle} />;
};

export default BattleProvider;
