import { Metadata } from 'next';
import Head from 'next/head';
import React from 'react';

import '../styles/global.css';

export const metadata: Metadata = {
	title: 'Pokemon Master'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="/public/images/favicon.ico" />
			</Head>
			<body>{children}</body>
		</html>
	);
}
