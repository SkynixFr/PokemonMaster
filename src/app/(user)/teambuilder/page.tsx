// Components
import TeamBuilderPage from '../../../front/components/teambuilder/teamBuilderPage';

// Actions
import { getTeams } from '../../../front/actions/team.actions';
import { getAvatars } from '../../../front/actions/avatar.actions';

const TeamBuilder = async () => {
	const teams = await getTeams();
	const avatars = await getAvatars();

	return <TeamBuilderPage teams={teams} avatars={avatars} />;
};

export default TeamBuilder;
