'use server';

// Interfaces
import { AvatarCreate } from '../../interfaces/avatar/avatarCreate';
import { toLowerCaseWithoutSpaceAndSpecialChar } from '../utils/formatString';

export const getAvatars = async () => {
	const response = await fetch('http://localhost:8080/api/v1/avatars', {
		method: 'GET',
		cache: 'no-store'
	});

	return response.json();
};

export const addAvatar = async (formData: FormData) => {
	const avatar: AvatarCreate = {
		name: formData.get('avatar').toString(),
		region: formData.get('region').toString() as AvatarCreate['region'],
		sprite: `/images/compressed/avatars/${formData.get('region').toString()}/${toLowerCaseWithoutSpaceAndSpecialChar(formData.get('avatar').toString())}.png`
	};

	const response = await fetch('http://localhost:8080/api/v1/avatars', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(avatar)
	});

	if (response.status === 409) {
		throw new Error('Avatar already exists');
	}

	if (!response.ok) {
		throw new Error('Failed to add avatar');
	}

	return response.json();
};

export const deleteAvatar = async (id: string) => {
	const response = await fetch(`http://localhost:8080/api/v1/avatars/${id}`, {
		method: 'DELETE'
	});

	if (response.status === 404) {
		throw new Error('Avatar not found');
	}

	if (!response.ok) {
		throw new Error('Failed to delete avatar');
	}
};
