'use client';

import { faker } from '@faker-js/faker';
import { UserEntity } from '../../../interfaces/user/userEntity';
import Image from 'next/image';
import { PencilLine, SaveAll, Trash2 } from 'lucide-react';
// Actions
interface UserListProps {
	userDetails: UserEntity;
}

const ProfilePage = (userDetails: UserListProps) => {
	const avatar = faker.image.avatarGitHub();
	return (
		<div>
			<h2>Profil</h2>
			<div className="profil-infos">
				<div className="user-infos-container">
					<div className="user-infos">
						<div className="user-img">
							<Image
								src={avatar}
								alt="avatar Profile"
								priority
								width={250}
								height={250}
							/>
						</div>
						<div className="user-details">
							<div className="user-account">
								<div className="user-username">
									<h1>{userDetails.userDetails.username}</h1>
								</div>
							</div>
						</div>
						<div className="user-edition">
							<button type="submit" className="user-update">
								<span>Modifier</span>
								<PencilLine />
							</button>
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
