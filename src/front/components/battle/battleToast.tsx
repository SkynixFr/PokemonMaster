// Interfaces
import { Notification } from '../../../interfaces/battle/notitication';
import CustomImage from '../customImage';
import {
	firstLetterMaj,
	withoutSpaceAndSpecialChar
} from '../../utils/formatString';
interface BattleToastProps {
	currentNotification: Notification;
	battleTurnEnd: boolean;
}

const BattleToast = ({
	currentNotification,
	battleTurnEnd
}: BattleToastProps) => {
	return (
		<>
			{currentNotification && (
				<div
					className={`battle-toast`}
					style={{
						animation: battleTurnEnd
							? 'fadeInToRight 2s ease-in-out forwards'
							: 'none'
					}}
				>
					<div
						className={`battle-toast__avatar ${currentNotification.userAvatar.name}`}
					>
						<CustomImage
							src={currentNotification.userAvatar.sprite}
							alt={"User's avatar"}
							width={85}
							height={125}
						/>
					</div>
					<div className={'battle-toast__text'}>
						<strong>
							{firstLetterMaj(currentNotification.pokemonName)}
						</strong>{' '}
						{currentNotification.isKo && (
							<>
								{'is '}
								<strong>KO</strong>
							</>
						)}
						{currentNotification.move && (
							<>
								{'use'}
								<div
									className={`battle-toast__move ${currentNotification.move.type}`}
								>
									<strong>
										{firstLetterMaj(currentNotification.move.name)}
									</strong>{' '}
									!
								</div>
							</>
						)}
						{currentNotification.statusEffect && (
							<>
								<div
									className={`battle-toast__move ${currentNotification.statusEffect.type}`}
								>
									<strong>
										{withoutSpaceAndSpecialChar(
											currentNotification.statusEffect.name
										)}
									</strong>
								</div>
							</>
						)}
						{currentNotification.animationType === 'miss' && (
							<>{'miss !'}</>
						)}
					</div>
				</div>
			)}
		</>
	);
};
export default BattleToast;
