// Interfaces
import { Notification } from '../../../interfaces/battle/notitication';
import CustomImage from '../customImage';
import {
	firstLetterMaj,
	withoutSpaceAndSpecialChar
} from '../../utils/formatString';
interface BattleToastProps {
	currentNotification: Notification;
}

const BattleToast = ({ currentNotification }: BattleToastProps) => {
	return (
		<>
			{currentNotification && (
				<div className={'battle-toast'}>
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
						{!currentNotification.isKo ? (
							<>
								used{' '}
								<span
									className={`battle-toast__move ${currentNotification.move.type}`}
								>
									<strong>
										{withoutSpaceAndSpecialChar(
											currentNotification.move.name
										)}
									</strong>
								</span>
								!
							</>
						) : (
							'is KO!'
						)}
					</div>
				</div>
			)}
		</>
	);
};
export default BattleToast;
