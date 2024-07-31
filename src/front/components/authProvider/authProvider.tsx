'use client';
export const isConnected = () => {
	return localStorage.getItem('accessToken');
};
