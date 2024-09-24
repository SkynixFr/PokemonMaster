'use client';
// React
import React, { useState } from 'react';
import Image from 'next/image';
import { MoveLeft, PencilLine, Trash2, X } from 'lucide-react';
import CustomImage from '../customImage';

// Components
import FormEditAvatar from './formEditAvatar';
import FormEditUsername from './formEditUsername';
import FormEditEmail from './formEditEmail';
import FormEditPassword from './formEditPassword';
import FormDeleteAccount from './formDeleteAccount';
import GobackModal from './gobackModal';
// Model
import { UserEntity } from '../../../interfaces/user/userEntity';
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
import { set } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TeamBuilderPage from '../teambuilder/teamBuilderPage';
import Profile from '../../../app/(user)/profile/page';
import ProfileUserTeam from './profileUserTeam';

interface UserListProps {
	userDetails: UserEntity;
	teams: TeamEntity[];
	avatars: AvatarEntity[];
}

const ProfilePage = ({ userDetails, teams, avatars }: UserListProps) => {
	const router = useRouter();
	const [openForm, setOpenForm] = useState<
		'avatar' | 'username' | 'email' | 'password' | 'delete' | null
	>(null);
	const [currentAvatar, setCurrentAvatar] = useState(userDetails.avatar);
	const [username, setUsername] = useState(userDetails.username);
	const [email, setEmail] = useState(userDetails.email);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const handleAvatarUpdate = (newAvatar: AvatarEntity) => {
		setCurrentAvatar(newAvatar);
	};

	const handleUsernameUpdate = (newUsername: string) => {
		setUsername(newUsername);
	};

	const handleEmailUpdate = (newEmail: string) => {
		setEmail(newEmail);
	};
	const OpenPasswordModal = () => {
		setIsPasswordModalOpen(true);
		setOpenForm('password');
	};

	const OpenDeleteModal = () => {
		setIsDeleteModalOpen(true);
		setOpenForm('delete');
	};

	return (
		<div className="profile-container">
			{openModal && <GobackModal setOpenModal={setOpenModal} />}
			<div
				className={'Go-Back-container'}
				onClick={() => setOpenModal(!openModal)}
			>
				<MoveLeft />
				<div className="back-link">Go Back</div>
			</div>
			<div className={'form-background'}>
				<CustomImage
					src={`/images/backgrounds/pokemonMaster-bg-login.jpg`}
					alt={'background login'}
					width={10000}
					height={10000}
				/>
			</div>
			<div className={'bg-form-profile'}>
				<CustomImage
					src="/images/other/bg-form-team.png"
					alt="Background form team"
					width={344}
					height={250}
				/>
			</div>
			<div className="profil-infos">
				<div className="user-infos-container">
					<h1>Your Profile </h1>
					<div className="user-infos">
						<div className="user-avatar">
							<div className="btn-edit-avatar-container">
								<button
									className={'btn-edit-avatar'}
									onClick={() => setOpenForm('avatar')}
									disabled={openForm !== null}
								>
									<PencilLine />
								</button>
							</div>
							<div className="user-img-container">
								<div className="user-img">
									<CustomImage
										src={currentAvatar.sprite}
										alt={currentAvatar.name}
										width={250}
										height={250}
										className="profile-image"
										sizes="(max-width: 600px) 150px, (max-width: 1200px) 150px, 150px"
									/>
								</div>
							</div>
						</div>
						<div className="user-details">
							<FormEditUsername
								userDetails={userDetails}
								initialUsername={username}
								onUsernameUpdate={handleUsernameUpdate}
								setOpenForm={setOpenForm}
								openForm={openForm}
							/>

							<FormEditEmail
								userDetails={userDetails}
								initialEmail={email}
								onEmailUpdate={handleEmailUpdate}
								setOpenForm={setOpenForm}
								openForm={openForm}
							/>
						</div>
						<div className="password-and-delete">
							<div className="user-password btn-secondary">
								<button
									onClick={() => OpenPasswordModal()}
									disabled={openForm !== null}
								>
									<span>Update your password</span>

									<PencilLine />
								</button>
							</div>
							<div className="user-delete">
								<button
									onClick={() => OpenDeleteModal()}
									className="user-delete btn-primary"
									disabled={openForm !== null}
								>
									<span>Delete Account</span>
									<Trash2 />
								</button>
							</div>
						</div>
					</div>
					<div className="separator-line" />
					<div className="user-teams-container">
						<h1>Your Teams :</h1>
						<div className="user-teams-info">
							<ProfileUserTeam teams={teams} avatars={avatars} />
						</div>
					</div>
				</div>
			</div>
			{openForm == 'avatar' && (
				<div className={'edit-avatar-avatar'}>
					<FormEditAvatar
						userDetails={userDetails}
						avatars={avatars}
						setOpenForm={setOpenForm}
						onAvatarUpdate={handleAvatarUpdate}
					/>
				</div>
			)}

			{isPasswordModalOpen && (
				<div className="password-modal">
					<FormEditPassword
						userDetails={userDetails}
						setOpenPasswordModal={setIsPasswordModalOpen}
						setOpenForm={setOpenForm}
						openForm={openForm}
					/>
				</div>
			)}
			{isDeleteModalOpen && (
				<div className="Go-Back-container">
					<FormDeleteAccount
						userDetails={userDetails}
						setIsDeleteModalOpen={setIsDeleteModalOpen}
						setOpenForm={setOpenForm}
						openForm={openForm}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
