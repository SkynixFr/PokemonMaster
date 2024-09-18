import { useRouter } from 'next/navigation';

// Classes
import Team from '../../../back/classes/team';

// Interfaces
interface BattleEndProps {
	playerTeam: Team;
}

const BattleEnd = ({ playerTeam }: BattleEndProps) => {
	const router = useRouter();
	return (
		<div className={'battle-end-modal'}>
			<div className={'battle-end-modal-body'}>
				{playerTeam.pokemons.every(
					pokemon => pokemon.stats[0].value === 0
				) ? (
					<div className={'battle-end-modal-content'}>
						<div className={'battle-end-modal-title'}>
							<h1>You lost the battle!</h1>
							<span>You'll get them next time!</span>
						</div>
						<button
							className={'battle-end-modal-button btn-primary'}
							onClick={() => router.push('/teambuilder')}
						>
							Go back
						</button>
					</div>
				) : (
					<div className={'battle-end-modal-content'}>
						<div className={'battle-end-modal-title'}>
							<h1>You won the battle! Congratulations!</h1>
							<span>You're a Pokemon Master!</span>
						</div>
						<button
							className={'battle-end-modal-button btn-primary'}
							onClick={() => router.push('/teambuilder')}
						>
							Go back
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default BattleEnd;
