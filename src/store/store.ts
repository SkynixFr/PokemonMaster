'use client';
import { configureStore } from '@reduxjs/toolkit';

// Slices
import { battleSlice } from './features/battleSlice';

export const store = configureStore({
	reducer: {
		// teams: teamsReducer
		battle: battleSlice.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
