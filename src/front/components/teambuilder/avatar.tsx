import CustomImage from '../customImage';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
interface AvatarProps {
	avatar: AvatarEntity;
	avatarSelected: AvatarEntity;
	setAvatarSelected: (avatar: AvatarEntity) => void;
}

const Avatar = ({ avatar, avatarSelected, setAvatarSelected }: AvatarProps) => {
	return (
		<div
			className={`avatar-container ${avatarSelected.id === avatar.id ? 'selected' : ''}`}
			onClick={() => setAvatarSelected(avatar)}
		>
			<div className={'avatar-img'}>
				<CustomImage
					src={avatar.sprite}
					alt={avatar.name}
					fill={true}
					sizes="(max-width: 640px) 50px, 100px"
				/>
			</div>
		</div>
	);
};

export default Avatar;
