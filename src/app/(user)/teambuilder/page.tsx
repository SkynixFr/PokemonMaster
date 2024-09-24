'use client';
// Components
import TeamBuilderPage from '../../../front/components/teambuilder/teamBuilderPage';

// Actions

import { getTeams } from '../../../front/actions/team.actions';
import { getAvatars } from '../../../front/actions/avatar.actions';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Unauthorized from '../unauthorized/page';

const TeamBuilder = () => {
	const [teams, setTeams] = useState([]);
	const [avatars, setAvatars] = useState([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				if (!accessToken) {
					throw new Error('User not Connected');
				}

				const teamsData = await getTeams();
				const avatarsData = await getAvatars();
				setTeams(teamsData);
				setAvatars(avatarsData);
				setError(null);
			} catch (error) {
				if (error.message != 'User not Connected') {
					toast.error('Error fetching user data');
				}
				console.error('Error fetching user data:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	});

	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<Unauthorized />
	) : (
		<div>
			<TeamBuilderPage teams={teams} avatars={avatars} />;
		</div>
	);
};

export default TeamBuilder;
