export const getAvatars = async () => {
	const response = await fetch('http://localhost:8080/api/v1/avatars', {
		method: 'GET',
		cache: 'no-store'
	});

	return response.json();
};
