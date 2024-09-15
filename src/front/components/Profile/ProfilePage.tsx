'use client';
// React
import React, { useState } from 'react';
import Image from 'next/image';
import { PencilLine, Trash2 } from 'lucide-react';
import CustomImage from '../customImage';
import FormEditAvatar from './formEditAvatar';
import FormEditUsername from './formEditUsername'; // Import the new form
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
	const [username, setUsername] = useState(userDetails.username); // Track updated username

	const handleAvatarUpdate = (newAvatar: AvatarEntity) => {
		setCurrentAvatar(newAvatar);
	};

	const handleUsernameUpdate = (newUsername: string) => {
		setUsername(newUsername); // Update username state
		// Optionally call an API to save the username change
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
							<div className="user-email">
								{
									// TDOO: Add email editing form
								}
								<div className="user-email-label">
									<h2>Email :</h2>
									<h3>
										{`${userDetails.email
											.split('@')[0]
											.slice(0, 3)
											.padEnd(
												userDetails.email.split('@')[0].length,
												'*'
											)}@${userDetails.email.split('@')[1]}`}
									</h3>
								</div>
								<div className="user-email-edit">
									<button type="submit" className="user-update">
										<PencilLine />
									</button>
								</div>
							</div>
						</div>
						<div className="user-delete">
							<button type="submit" className="user-delete">
								<span>Supprimer</span>
								<Trash2 />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
