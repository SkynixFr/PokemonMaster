'use client';

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { me } from '../../actions/user.actions';
import { UserEntity } from '../../../interfaces/user/userEntity';

// Actions
interface UserListProps {
	userDetails: UserEntity;
}

const ProfilePage = (userDetails: UserListProps) => {
	const router = useRouter();
	console.log(userDetails);
	return (
		<div>
			<h2>Profil</h2>
			<div className="userDetails">
				<div className="user-username">
					<span>Username:</span>
					<span>{userDetails.userDetails.username}</span>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
