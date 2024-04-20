import { getAvatars } from '../../front/actions/avatar.actions';

import Dashboard from '../../front/components/dashboard/dasboard';

const DasboardServer = async () => {
	const avatars = await getAvatars();
	console.log(avatars);
	return <Dashboard avatars={avatars} />;
};

export default DasboardServer;
