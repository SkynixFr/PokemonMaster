'use client';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store/store';

// Classes
import PokemonClass from '../../back/classes/pokemon';
import StatClass from '../../back/classes/stat';
import MoveClass from '../../back/classes/move';

// Slice
import {
	setOpponentPokemon,
	setPlayerPokemon
} from '../../store/features/battleSlice';

const BattleProvider = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();
	const { opponentPokemon, playerPokemon } = useSelector(
		(state: RootState) => state.battle
	);

	useEffect(() => {
		if (!opponentPokemon.name) {
			const opponent = new PokemonClass(
				'Bulbasaur',
				[new StatClass('hp', 100, 100)],
				[new MoveClass('Tackle', 15)]
			);
			dispatch(setOpponentPokemon(opponent));
		}
		if (!playerPokemon.name) {
			const player = new PokemonClass(
				'Charmander',
				[new StatClass('hp', 100, 100)],
				[new MoveClass('Scratch', 15)]
			);

			dispatch(setPlayerPokemon(player));
		}
	}, [dispatch, opponentPokemon.name, playerPokemon.name]);

	return <>{children}</>;
};

export default BattleProvider;
