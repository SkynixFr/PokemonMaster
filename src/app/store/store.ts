'use client';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Slices
import teamsReducer from './features/teamsSlice';
import battleReducer from './features/battleSlice';

export const store = configureStore({
	reducer: {
		teams: teamsReducer,
		battleSlice: battleReducer
	}
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
