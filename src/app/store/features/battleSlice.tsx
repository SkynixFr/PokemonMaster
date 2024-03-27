'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IBattle from '../../../types/interfaces/IBattle';
import ITeam from '../../../types/interfaces/ITeam';

export interface BattleState {
	battle: IBattle;
}

const initialState: BattleState = {
	battle: {
		hostTeam: { team: { name: '', avatar: '', pokemons: [] } },
		guestTeam: { team: { name: '', avatar: '', pokemons: [] } },
		turn: 0
	}
};

export const battleSlice = createSlice({
	name: 'battle',
	initialState,
	reducers: {
		setBattle: (state, action: PayloadAction<IBattle>) => {
			state.battle = action.payload;
		},
		changeTurn: (state, action: PayloadAction<number>) => {
			state.battle.turn = action.payload;
		}
	}
});

export const { setBattle, changeTurn } = battleSlice.actions;
export default battleSlice.reducer;
