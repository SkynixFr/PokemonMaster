import { Metadata } from 'next';
import React from 'react';
import { Toaster } from 'sonner';

import '../front/styles/global.css';
import Navbar from '../front/components/navbar';

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
				<Toaster
					richColors={true}
					visibleToasts={10}
					position={'top-right'}
					className={'toast'}
				/>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
