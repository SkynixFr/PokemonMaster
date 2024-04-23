import UpdateData from '../../../front/components/dashboard/updateData';
import Link from 'next/link';
import { getAvatars } from '../../../front/actions/avatar.actions';
import AvatarList from '../../../front/components/dashboard/avatarList';
import FormAvatar from '../../../front/components/dashboard/formAvatar';

const Dasboard = async () => {
	const avatars = await getAvatars();
	return (
		<div>
			<Link href={'/'}>Go Back</Link>
			<h1>Admin Dasboard</h1>
			<UpdateData />
			<FormAvatar />
			{avatars.length > 0 ? (
				<AvatarList avatars={avatars} />
			) : (
				<div>No avatars found</div>
			)}
		</div>
	);
};

export default Dasboard;
