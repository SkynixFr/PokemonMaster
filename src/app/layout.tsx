import { Metadata } from 'next';
import React from 'react';

// Providers
import StoreProvider from './components/providers/storeProvider';
import TeamsProvider from './components/providers/teamsProvider';

import '../styles/global.scss';

export const metadata: Metadata = {
	title: 'Pokemon Master',
	description: 'A new Pokemon battle game!',
	keywords: 'pokemon, battle, game, PokemonShowdown, PokemonMaster',
	icons: {
		icon: '/favicon.ico'
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<StoreProvider>
					<TeamsProvider>{children}</TeamsProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
