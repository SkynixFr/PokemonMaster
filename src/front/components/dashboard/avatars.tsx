'use client';

// Components
import Avatar from './avatar';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
interface AvatarListProps {
	avatars: AvatarEntity[];
}

const Avatars = ({ avatars }: AvatarListProps) => {
	return (
		<div>
			<h1>Avatar List</h1>
			<ul>
				{avatars.map(avatar => (
					<Avatar avatar={avatar} key={avatar.id} />
				))}
			</ul>
		</div>
	);
};

export default Avatars;
