import AvatarItem from './avatarItem';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

interface AvatarListProps {
	avatars: AvatarEntity[];
}

const AvatarList = ({ avatars }: AvatarListProps) => {
	return (
		<div>
			<h1>Avatar List</h1>
			<ul>
				{avatars.map(avatar => (
					<AvatarItem avatar={avatar} key={avatar.id} />
				))}
			</ul>
		</div>
	);
};

export default AvatarList;
