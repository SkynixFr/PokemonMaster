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
	console.log(userLogin);

	const response = await fetch('http://localhost:8080/api/v1/user/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userLogin)
	});
	return response.json();
};
