'use server';

// Interfaces
import { AvatarCreate } from '../../interfaces/avatar/avatarCreate';
import { AvatarEntity } from '../../interfaces/avatar/avatarEntity';

// Utils
import { firstLetterMaj } from '../utils/formatString';

export const getAvatars = async (): Promise<AvatarEntity[]> => {
	// try {
	const response = await fetch('http://localhost:8080/api/v1/avatars', {
		method: 'GET',
		cache: 'no-store'
	});

	return response.json();
};

export const addAvatar = async (formData: FormData) => {
	const avatar: AvatarCreate = {
		name: firstLetterMaj(formData.get('avatar').toString()),
		region: formData
			.get('region')
			.toString()
			.toLowerCase() as AvatarCreate['region'],
		sprite: `/images/avatars/${formData.get('region').toString().toLowerCase()}/${formData.get('sprite').toString().toLowerCase()}.png`
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

export const deleteAvatar = async (id: string) => {
	await fetch(`http://localhost:8080/api/v1/avatars/${id}`, {
		method: 'DELETE'
	});
};
