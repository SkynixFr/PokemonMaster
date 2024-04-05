'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
		const storedOpponentPokemon = localStorage.getItem('opponentPokemon');
		const storedPlayerPokemon = localStorage.getItem('playerPokemon');

		if (storedOpponentPokemon && storedPlayerPokemon) {
			dispatch(setOpponentPokemon(JSON.parse(storedOpponentPokemon)));
			dispatch(setPlayerPokemon(JSON.parse(storedPlayerPokemon)));
		} else {
			localStorage.setItem(
				'opponentPokemon',
				JSON.stringify(opponentPokemon)
			);
			localStorage.setItem('playerPokemon', JSON.stringify(playerPokemon));
		}
	}, []);

	return <>{children}</>;
};

export default BattleProvider;
