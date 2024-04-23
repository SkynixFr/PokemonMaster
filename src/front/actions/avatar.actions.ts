'use server';

// Interfaces
import { AvatarCreate } from '../../interfaces/avatar/avatarCreate';

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
		sprite: `/images/compressed/avatars/${formData.get('region')}/${formData.get('avatar')}.png`
	};

	const response = await fetch('http://localhost:8080/api/v1/avatars', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(avatar)
	});

	return response.json();
};
