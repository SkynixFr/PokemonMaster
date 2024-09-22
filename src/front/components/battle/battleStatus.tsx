import { useEffect, useState } from 'react';

// Classes
import Pokemon from '../../../back/classes/pokemon';
import CustomImage from '../customImage';

// Interfaces
import { Notification } from '../../../interfaces/battle/notitication';

interface BattleStatusProps {
	activePokemon: Pokemon;
	currentNotification?: Notification;
	isSwitching?: boolean;
}

const BattleStatus = ({
	activePokemon,
	currentNotification,
	isSwitching
}: BattleStatusProps) => {
	const [showStatus, setShowStatus] = useState(false);
	const [showVolatileStatus, setShowVolatileStatus] = useState(false);

	useEffect(() => {
		if (currentNotification?.animationType === 'status') {
			setTimeout(() => {
				setShowStatus(true);
				setShowVolatileStatus(true);
			}, 2500);
		}
	}, [currentNotification]);

	return (
		<div className={`battle-status`}>
			{activePokemon.status.name !== '' &&
			activePokemon.status.name !== 'KO' &&
			showStatus ? (
				<div
					className={`battle-status-infos ${activePokemon.status.name.toLowerCase()}`}
					style={{
						animation: isSwitching
							? 'none'
							: currentNotification?.animationType === 'status'
								? 'popIn 1s ease-in-out forwards'
								: 'none'
					}}
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
											: activePokemon.status.name === 'FRZ'
												? 'ice'
												: 'psychic'
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
			{activePokemon.volatileStatus.name !== '' && showVolatileStatus ? (
				<div
					className={`battle-volatile-infos ${activePokemon.volatileStatus.name.toLowerCase()}`}
					style={{
						animation: isSwitching
							? 'none'
							: currentNotification?.animationType === 'status'
								? 'popIn 1s ease-in-out forwards'
								: 'none'
					}}
				>
					<CustomImage
						src={`/images/types/${activePokemon.volatileStatus.name === 'CNF' ? 'psychic' : ''}.png`}
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
