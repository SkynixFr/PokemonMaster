import { Metadata } from 'next';
import React from 'react';

import '../front/styles/global.css';

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
			<body>{children}</body>
		</html>
	);
}
