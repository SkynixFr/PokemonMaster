import Image from 'next/image';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
interface AvatarProps {
	avatar: AvatarEntity;
}

const Avatar = ({ avatar }: AvatarProps) => {
	return (
		<div>
			<Image
				src={avatar.sprite}
				alt={avatar.name}
				width={100}
				height={100}
				priority={true}
				quality={100}
				sizes={'100vw'}
				style={{ objectFit: 'contain' }}
			/>
		</div>
	);
};

export default Avatar;
