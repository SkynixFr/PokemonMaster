'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Team from '../../../types/Team';

interface TeamState {
	teams: Team[];
}

const initialState: TeamState = {
	teams: []
};

export const teamsSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		addTeams: (state, action: PayloadAction<Team[]>) => {
			state.teams = action.payload;
		},
		addTeam: (state, action: PayloadAction<Team>) => {
			state.teams.push(action.payload);
		},
		deleteTeam: (state, action: PayloadAction<Team>) => {
			state.teams = state.teams.filter(
				team => team.name !== action.payload.name
			);
		},
		updateTeam: (state, action: PayloadAction<Team>) => {
			const index = state.teams.findIndex(
				team => team.name === action.payload.name
			);
			state.teams[index] = action.payload;
		}
	}
});

export const { addTeams, addTeam, deleteTeam, updateTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
