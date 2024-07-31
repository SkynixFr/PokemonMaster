'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { me } from '../../../front/actions/user.actions';
import ProfilePage from '../../../front/components/Profile/ProfilePage';
import { UserEntity } from '../../../interfaces/user/userEntity';

const Profile = () => {
	const [user, setUser] = useState<UserEntity>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				if (!accessToken) {
					throw new Error('Access token not found');
				}
				const userData = await me(accessToken);
				setUser(userData);
				setError(null); // Clear any previous errors
			} catch (error) {
				toast.error('Failed to fetch user data');
				console.error('Error fetching user data:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router]);
	return (
		<div>
			<Link href={'/'}>Go Back</Link>
			<h1>Page de Profil</h1>
			<ProfilePage userDetails={user} />
		</div>
	);
};

export default Profile;
