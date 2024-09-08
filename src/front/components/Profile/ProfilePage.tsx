'use client';
// React

import Image from 'next/image';
import { PencilLine, SaveAll, Trash2 } from 'lucide-react';

// Model
import { UserEntity } from '../../../interfaces/user/userEntity';
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
import ProfileTeams from './ProfileTeams';
//

// Actions
interface UserListProps {
	userDetails: UserEntity;
	teams: TeamEntity[];
	avatars: AvatarEntity[];
}

const ProfilePage = ({ userDetails, teams, avatars }: UserListProps) => {
	return (
		<div>
			{/* <h2>Profil</h2> */}
			<div className="profil-infos">
				<div className="user-infos-container">
					<div className="user-infos">
						<div className="user-img">
							{/* TODO : <Image
								src={avatar}
								alt="avatar Profile"
								priority
								width={250}
								height={250}
							/> */}
						</div>
						<div className="user-details">
							<div className="user-account">
								<div className="user-username">
									<h1>{userDetails.username}</h1>
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
