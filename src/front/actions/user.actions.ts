'use server';

import { UserCreate } from '../../interfaces/user/userCreate';

export const register = async (formData: FormData) => {
	const userCreate: UserCreate = {
		username: formData.get('username').toString(),
		password: formData.get('password').toString(),
		email: formData.get('email').toString(),
		role: 'USER'
	};

	const response = await fetch('http://localhost:8080/api/v1/user/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userCreate)
	});
	return response.json();
};

export const login = async (formData: FormData) => {
	const userLogin = {
		email: formData.get('email').toString(),
		password: formData.get('password').toString()
	};
	const response = await fetch('http://localhost:8080/api/v1/user/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userLogin)
	});
	return response.json();
};

export const me = async (accessToken: string) => {
	try {
		const response = await fetch('http://localhost:8080/api/v1/user/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		});

		// Check if the response is OK
		if (!response.ok) {
			// Try to parse the error response
			let errorData;
			try {
				errorData = await response.json();
			} catch (error) {
				errorData = { message: 'Failed to fetch user data' };
			}
			throw new Error(errorData.message || 'Failed to fetch user data');
		}

		// Parse the JSON response
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error in me function:', error);
		throw error;
	}
};
