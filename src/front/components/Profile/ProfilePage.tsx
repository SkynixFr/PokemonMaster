'use client';
// React
import React, { useState } from 'react';
import Image from 'next/image';
import { PencilLine, Trash2 } from 'lucide-react';
import CustomImage from '../customImage';

// Components
import FormEditAvatar from './formEditAvatar';
import FormEditUsername from './formEditUsername';
import FormEditEmail from './formEditEmail';
import FormEditPassword from './formEditPassword';
import FormDeleteAccount from './formDeleteAccount';
// Model
import { UserEntity } from '../../../interfaces/user/userEntity';
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

interface UserListProps {
	userDetails: UserEntity;
	teams: TeamEntity[];
	avatars: AvatarEntity[];
}

const ProfilePage = ({ userDetails, teams, avatars }: UserListProps) => {
	const [openForm, setOpenForm] = useState(false);
	const [currentAvatar, setCurrentAvatar] = useState(userDetails.avatar);
	const [username, setUsername] = useState(userDetails.username);
	const [email, setEmail] = useState(userDetails.email);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleAvatarUpdate = (newAvatar: AvatarEntity) => {
		setCurrentAvatar(newAvatar);
	};

	const handleUsernameUpdate = (newUsername: string) => {
		setUsername(newUsername);
	};

	const handleEmailUpdate = (newEmail: string) => {
		setEmail(newEmail);
	};
	return (
		<div>
			<div className="profil-infos">
				<div className="user-infos-container">
					<div className="user-infos">
						<div className="btn-edit-avatar-container">
							<button
								className={'btn-edit-avatar'}
								onClick={() => setOpenForm(!openForm)}
							>
								<PencilLine />
							</button>
						</div>
						<div className="user-img">
							<CustomImage
								src={currentAvatar.sprite}
								alt={currentAvatar.name}
								width={150}
								height={180}
								className="profile-image"
								sizes="(max-width: 600px) 150px, (max-width: 1200px) 150px, 150px"
							/>
						</div>
						{openForm && (
							<div className={'edit-avatar-avatar'}>
								<FormEditAvatar
									userDetails={userDetails}
									avatars={avatars}
									setOpenForm={setOpenForm}
									onAvatarUpdate={handleAvatarUpdate}
								/>
							</div>
						)}
						<div className="user-details">
							<div className="user-account">
								<FormEditUsername
									userDetails={userDetails}
									initialUsername={username}
									onUsernameUpdate={handleUsernameUpdate}
								/>
							</div>
							<FormEditEmail
								userDetails={userDetails}
								initialEmail={email}
								onEmailUpdate={handleEmailUpdate}
							/>
							{!isPasswordModalOpen && (
								<div className="user-password">
									<button onClick={() => setIsPasswordModalOpen(true)}>
										<span>Update your password</span>
										<PencilLine />
									</button>
								</div>
							)}
						</div>
						<div className="user-delete">
							<button
								onClick={() => setIsDeleteModalOpen(true)}
								className="user-delete"
							>
								<span>Supprimer</span>
								<Trash2 />
							</button>
						</div>
					</div>
				</div>
			</div>

			{isPasswordModalOpen && (
				<div className="password-modal">
					<FormEditPassword
						userDetails={userDetails}
						setOpenPasswordModal={setIsPasswordModalOpen}
					/>
				</div>
			)}
			{isDeleteModalOpen && (
				<div className="delete-modal">
					<FormDeleteAccount
						userDetails={userDetails}
						setIsDeleteModalOpen={setIsDeleteModalOpen}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
