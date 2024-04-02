'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
import IBattle from '../../interfaces/IBattle';

const initialState: IBattle = {
	opponentPokemon: {
		name: '',
		stats: [],
		moves: []
	},
	playerPokemon: {
		name: '',
		stats: [],
		moves: []
	}
};

export const battleSlice = createSlice({
	name: 'battle',
	initialState,
	reducers: {
		setOpponentPokemon: (
			state,
			action: PayloadAction<IBattle['opponentPokemon']>
		) => {
			state.opponentPokemon = action.payload;
		},
		setPlayerPokemon: (
			state,
			action: PayloadAction<IBattle['playerPokemon']>
		) => {
			state.playerPokemon = action.payload;
		}
	}
});

export const { setOpponentPokemon, setPlayerPokemon } = battleSlice.actions;
export default battleSlice.reducer;
