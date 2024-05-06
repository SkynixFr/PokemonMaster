'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Ajoutez ici la logique de connexion
	};

	return (
		<div>
			<Link href={'/'}>Go Back</Link>
			<h1>Page de connexion</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Mot de passe:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">Se connecter</button>
			</form>
		</div>
	);
};

export default Login;
