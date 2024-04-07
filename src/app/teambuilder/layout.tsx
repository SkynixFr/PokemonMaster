import TeamsProvider from '../../front/providers/teamsProvider';

const TeamBuilderLayout = ({ children }) => {
	return <TeamsProvider>{children}</TeamsProvider>;
};

export default TeamBuilderLayout;
