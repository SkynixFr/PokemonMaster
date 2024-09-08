// Classes
import Pokemon from '../../../back/classes/pokemon';
import CustomImage from '../customImage';

interface BattleStatusProps {
	activePokemon: Pokemon;
}

const BattleStatus = ({ activePokemon }: BattleStatusProps) => {
	return (
		<div className={`battle-status`}>
			{activePokemon.status.name !== '' ? (
				<div
					className={`battle-status-infos ${activePokemon.status.name.toLowerCase()}`}
				>
					<CustomImage
						src={`/images/types/${
							activePokemon.status.name === 'PAR'
								? 'electric'
								: activePokemon.status.name === 'GEL'
									? 'ice'
									: activePokemon.status.name === 'BRN'
										? 'fire'
										: activePokemon.status.name === 'PSN'
											? 'poison'
											: 'ice'
						}.png`}
						alt={'Status icon'}
						width={20}
						height={20}
					/>
					<div className={'battle-status-name'}>
						<h3>{activePokemon.status.name}</h3>
					</div>
				</div>
			) : null}
			{activePokemon.volatileStatus.name !== '' ? (
				<div
					className={`battle-volatile-infos ${activePokemon.volatileStatus.name.toLowerCase()}`}
				>
					<CustomImage
						src={`/images/types/${activePokemon.volatileStatus.name === 'CNF' ? 'ghost' : ''}.png`}
						alt={'volatile status icon'}
						width={20}
						height={20}
					/>
					<div className={'battle-volatile-name'}>
						<h3>{activePokemon.volatileStatus.name}</h3>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default BattleStatus;
