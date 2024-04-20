'use server';

export const getAvatars = async () => {
	const response = await fetch('http://localhost:8080/api/v1/avatars');
	if (response.status !== 200) {
		throw new Error('Failed to fetch avatars');
	}

	return response.json();
};
