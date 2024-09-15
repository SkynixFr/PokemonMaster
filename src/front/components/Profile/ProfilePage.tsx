'use client';
// React
import React, { useState } from 'react';
import Image from 'next/image';
import { PencilLine, SaveAll, Trash2 } from 'lucide-react';
import CustomImage from '../customImage';
// Model
import { UserEntity } from '../../../interfaces/user/userEntity';
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
import ProfileTeams from './ProfileTeams';
import FormEditAvatar from './formEditAvatar';
//

// Actions
interface UserListProps {
	userDetails: UserEntity;
	teams: TeamEntity[];
	avatars: AvatarEntity[];
}

const ProfilePage = ({ userDetails, teams, avatars }: UserListProps) => {
	const [openForm, setOpenForm] = useState(false);
	const [currentAvatar, setCurrentAvatar] = useState(userDetails.avatar);
	const handleAvatarUpdate = (newAvatar: AvatarEntity) => {
		setCurrentAvatar(newAvatar);
		// Optionally, you might want to update userDetails or other states if needed
	};
	return (
		<div>
			{/* <h2>Profil</h2> */}
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
								width={150} /* Largeur de l'image */
								height={
									180
								} /* Hauteur de l'image (doit être égale à la largeur pour conserver le ratio 1:1) */
								className="profile-image" /* Appliquer la classe CSS pour le style */
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
								<div className="user-username">
									<h2>Username :</h2>
									<h1>{userDetails.username}</h1>
								</div>
								<div className="user-username-edit">
									<button type="submit" className="user-update">
										<PencilLine />
									</button>
								</div>
							</div>
							<div className="user-email">
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
						<div className="user-team">
							{/* TODO : <ProfileTeams teams={teams} avatars={avatars} /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
