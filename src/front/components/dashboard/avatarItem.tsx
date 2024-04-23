'use client';

import Image from 'next/image';

// Actions
import { deleteAvatar } from '../../actions/avatar.actions';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
interface AvatarItemProps {
	avatar: AvatarEntity;
}

const AvatarItem = ({ avatar }: AvatarItemProps) => {
	const router = useRouter();

	const handleDelete = async (avatarId: string) => {
		toast.promise(deleteAvatar(avatarId), {
			loading: 'Deleting avatar...',
			success: () => {
				router.refresh();
				return 'Avatar deleted';
			},
			error: error => {
				return error.message;
			},
			duration: null
		});
	};

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
			<button onClick={() => handleDelete(avatar.id)}>Delete</button>
		</li>
	);
};

export default AvatarItem;
