import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
import Image from 'next/image';

interface AvatarItemProps {
	avatar: AvatarEntity;
}

const AvatarItem = ({ avatar }: AvatarItemProps) => {
	return (
		<li>
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
			{avatar.name}
		</li>
	);
};

export default AvatarItem;
