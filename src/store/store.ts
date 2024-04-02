'use client';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Slices
import { battleSlice } from './features/battleSlice';

export const store = configureStore({
	reducer: {
		// teams: teamsReducer
		battle: battleSlice.reducer
	}
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
