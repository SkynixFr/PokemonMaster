'use client';

import { useEffect, useState } from 'react';

// Components
import Battle from '../../../app/(user)/battle/page';

//Classes
import BattleClass from '../../../back/classes/battle';

const BattleLoader = () => {
	const [battle, setBattle] = useState<BattleClass>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const battle = JSON.parse(localStorage.getItem('battle'));
		setBattle(battle);

		console.log('battleLoader', battle);
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	return (
		<div>{isLoading ? <p>Loading...</p> : <Battle battle={battle} />}</div>
	);
};

export default BattleLoader;
