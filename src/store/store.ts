'use client';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Slices
// import teamsReducer from './features/teamsSlice';

export const store = configureStore({
	reducer: {
		// teams: teamsReducer
	}
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
