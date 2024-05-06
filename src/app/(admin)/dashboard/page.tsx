import Link from 'next/link';

// Actions
import { getAvatars } from '../../../front/actions/avatar.actions';

// Components
import UpdateData from '../../../front/components/dashboard/updateData';
import Avatars from '../../../front/components/dashboard/avatars';
import FormAvatar from '../../../front/components/dashboard/formAvatar';

const Dasboard = async () => {
	const avatars = await getAvatars();

	return (
		<div>
			<Link href={'/'}>Go Back</Link>
			<h1>Admin Dashboard</h1>
			<UpdateData />
			<FormAvatar />
			{avatars.length > 0 && avatars ? (
				<Avatars avatars={avatars} />
			) : (
				<div>No avatars found</div>
			)}
		</div>
	);
};

export default Dasboard;
