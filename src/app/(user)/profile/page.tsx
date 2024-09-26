'use client';
// React
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

// Components
import ProfilePage from '../../../front/components/Profile/ProfilePage';
import { UserEntity } from '../../../interfaces/user/userEntity';
import TeamBuilderPage from '../../../front/components/teambuilder/teamBuilderPage';
// Actions
import { me } from '../../../front/actions/user.actions';
import { getTeams } from '../../../front/actions/team.actions';
import { getAvatars } from '../../../front/actions/avatar.actions';
import Unauthorized from '../unauthorized/page';
const Profile = () => {
	const [user, setUser] = useState<UserEntity>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [teams, setTeams] = useState([]);
	const [avatars, setAvatars] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				if (!accessToken) {
					throw new Error('User not connected');
				}
				const userData = await me(accessToken);
				const teamsData = await getTeams();
				const avatarsData = await getAvatars();
				setUser(userData);
				setTeams(teamsData);
				setAvatars(avatarsData);

				setError(null); // Clear any previous errors
			} catch (error) {
				console.error('Error fetching user data:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router]);
	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<Unauthorized />
	) : (
		<div>
			<ProfilePage userDetails={user} teams={teams} avatars={avatars} />
		</div>
	);
};

export default Profile;
