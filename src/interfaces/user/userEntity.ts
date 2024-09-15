import { AvatarEntity } from '../avatar/avatarEntity';
export interface UserEntity {
	id?: string;
	username: string;
	password: string;
	email: string;
	avatar: AvatarEntity;
	role: string;
}
