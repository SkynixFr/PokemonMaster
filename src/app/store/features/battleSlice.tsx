'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IBattle from '../../../types/interfaces/IBattle';
import ITeam from '../../../types/interfaces/ITeam';
import IPokemon from '../../../types/interfaces/IPokemon';
import Battle from '../../../classes/Battle';

export interface BattleState {
	hostTeam: ITeam;
	guestTeam: ITeam;
	turn: number;
}

const initialState: BattleState = {
	hostTeam: {
		name: '',
		avatar: '',
		pokemons: [],
		activePokemon: undefined,
		type: 'host'
	},
	guestTeam: {
		name: '',
		avatar: '',
		pokemons: [],
		activePokemon: undefined,
		type: 'guest'
	},
	turn: 0
};

export const battleSlice = createSlice({
	name: 'battle',
	initialState,
	reducers: {
		setHostTeam: (state, action: PayloadAction<ITeam>) => {
			state.hostTeam = action.payload;
		},
		setGuestTeam: (state, action: PayloadAction<ITeam>) => {
			state.guestTeam = action.payload;
		},
		setHostActivePokemon: (state, action: PayloadAction<IPokemon>) => {
			state.hostTeam.activePokemon = action.payload;
		},
		setGuestActivePokemon: (state, action: PayloadAction<IPokemon>) => {
			state.guestTeam.activePokemon = action.payload;
		},
		changeTurn: (state, action: PayloadAction<number>) => {
			state.turn = action.payload;
		},
		setBattle: (state, action: PayloadAction<IBattle>) => {
			state.hostTeam = action.payload.hostTeam;
			state.guestTeam = action.payload.guestTeam;
			state.turn = action.payload.turn;
			state.hostTeam.activePokemon = action.payload.hostTeam.pokemons[0];
			state.guestTeam.activePokemon = action.payload.guestTeam.pokemons[0];
		}
	}
});

export const {
	setHostTeam,
	setGuestTeam,
	changeTurn,
	setHostActivePokemon,
	setGuestActivePokemon,
	setBattle
} = battleSlice.actions;
export default battleSlice.reducer;
