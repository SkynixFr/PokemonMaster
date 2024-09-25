'use server';

import { UserCreate } from '../../interfaces/user/userCreate';
import { UserUpdate } from '../../interfaces/user/userUpdate';

export const register = async (formData: FormData) => {
	const userCreate: UserCreate = {
		username: formData.get('username').toString(),
		password: formData.get('password').toString(),
		email: formData.get('email').toString(),
		avatarId: '6633bc35a968092521e5204c',
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

export const updateUserAction = async (
	userUpdate: UserUpdate,
	accessToken: string
) => {
	const response = await fetch(
		`http://localhost:8080/api/v1/user/${userUpdate.id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(userUpdate)
		}
	);
	return response.json();
};

export const deleteUserAction = async (userId: string, accessToken: string) => {
	const response = await fetch(`http://localhost:8080/api/v1/user/${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});

	// Vérifiez si la réponse est une suppression réussie sans contenu (204 No Content)
	if (response.status === 200) {
		// La suppression a réussi, mais il n'y a pas de contenu dans la réponse
		return { message: 'Account deleted successfully' };
	}

	// Si la réponse contient un corps et est du JSON valide
	if (response.headers.get('content-type')?.includes('application/json')) {
		// Tente de parser le JSON uniquement si la réponse est du type JSON
		return response.json();
	} else {
		// Sinon, renvoyer un message par défaut
		return { message: 'Account deleted successfully but no JSON response' };
	}
};
