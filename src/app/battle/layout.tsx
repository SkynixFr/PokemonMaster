import { ReactNode } from 'react';

// Provider
import BattleProvider from '../../front/providers/battleProvider';

const BattleLayout = ({ children }: { children: ReactNode }) => {
	return <BattleProvider>{children}</BattleProvider>;
};

export default BattleLayout;
