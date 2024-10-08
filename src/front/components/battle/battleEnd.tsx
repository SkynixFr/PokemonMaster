import { useRouter } from 'next/navigation';

// Classes
import Team from '../../../back/classes/team';
import { useEffect, useState } from 'react';

// Interfaces
interface BattleEndProps {
	playerTeam: Team;
	opponentTeam: Team;
	playerRunning: boolean;
	opponentRunning: boolean;
}

const BattleEnd = ({
	playerTeam,
	opponentTeam,
	playerRunning,
	opponentRunning
}: BattleEndProps) => {
	const router = useRouter();
	const [playerWin, setPlayerWin] = useState(false);
	const [opponentWin, setOpponentWin] = useState(false);

	const handleBattleEnd = () => {
		localStorage.removeItem('battle');
		router.push('/teambuilder');
	};

	useEffect(() => {
		if (playerTeam.pokemons.every(pokemon => pokemon.stats[0].value === 0)) {
			setOpponentWin(true);
		}
		if (
			opponentTeam.pokemons.every(pokemon => pokemon.stats[0].value === 0)
		) {
			setPlayerWin(true);
		}
	}, []);

	return (
		<div className={'battle-end-modal'}>
			<div className={'battle-end-modal-body'}>
				<div className={'battle-end-modal-content'}>
					<div className={'battle-end-modal-title'}>
						{playerWin && (
							<>
								<h1>{playerTeam.name} won the battle !</h1>
							</>
						)}

						{opponentWin && (
							<>
								<h1>{opponentTeam.name} won the battle !</h1>
							</>
						)}

						{playerRunning && (
							<>
								<h1>
									{playerTeam.name} ran away, {opponentTeam.name} won !
								</h1>
							</>
						)}

						{opponentRunning && (
							<>
								<h1>
									{opponentTeam.name} ran away, {playerTeam.name} won !
								</h1>
							</>
						)}

						<span>Congratulations ! You're a Pokemon Master !</span>
					</div>
					<button
						className={'battle-end-modal-button btn-primary'}
						onClick={() => handleBattleEnd()}
					>
						Return to Team Builder
					</button>
				</div>
			</div>
		</div>
	);
};

export default BattleEnd;
