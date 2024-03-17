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
		}
	}
});

export const { addTeams, addTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
