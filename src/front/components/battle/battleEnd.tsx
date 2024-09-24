import { useRouter } from 'next/navigation';

// Classes
import Team from '../../../back/classes/team';
import { useEffect, useState } from 'react';

// Interfaces
interface BattleEndProps {
	playerTeam: Team;
	opponentTeam: Team;
}

const BattleEnd = ({ playerTeam, opponentTeam }: BattleEndProps) => {
	const [playerWin, setPlayerWin] = useState(false);
	const [opponentWin, setOpponentWin] = useState(false);
	const router = useRouter();

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
								<h1>
									{playerTeam.name} won the battle ! Congratulations!
								</h1>
							</>
						)}

						{opponentWin && (
							<>
								<h1>{opponentTeam.name} won the battle !</h1>
							</>
						)}
						<span>Congratulations ! You're a Pokemon Master !</span>
					</div>
					<button
						className={'battle-end-modal-button btn-primary'}
						onClick={() => router.push('/teambuilder')}
					>
						Go back
					</button>
				</div>

				{/*<div className={'battle-end-modal-content'}>*/}
				{/*	<div className={'battle-end-modal-title'}>*/}
				{/*		<h1>You won the battle! Congratulations!</h1>*/}
				{/*		<span>You're a Pokemon Master!</span>*/}
				{/*	</div>*/}
				{/*	<button*/}
				{/*		className={'battle-end-modal-button btn-primary'}*/}
				{/*		onClick={() => router.push('/teambuilder')}*/}
				{/*	>*/}
				{/*		Go back*/}
				{/*	</button>*/}
				{/*</div>*/}
			</div>
		</div>
	);
};

export default BattleEnd;
