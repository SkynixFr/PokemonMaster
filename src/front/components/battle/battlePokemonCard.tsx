import { useEffect, useState } from 'react';

//Classes
import Pokemon from '../../../back/classes/pokemon';

//Utils
import { firstLetterMaj } from '../../utils/formatString';

//Icons
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Components
import CustomImage from '../customImage';
import BattleStatus from './battleStatus';

//Interfaces
import { Notification } from '../../../interfaces/battle/notitication';
interface BattlePokemonCardProps {
	activePokemon: Pokemon;
	player?: boolean;
	isSwitching?: boolean;
	currentNotification?: Notification;
	previousHp?: number;
	setPreviousHp?: (hp: number) => void;
	currentView?: string;
}

const BattlePokemonCard = ({
	activePokemon,
	player,
	isSwitching,
	currentNotification,
	previousHp,
	currentView,
	setPreviousHp
}: BattlePokemonCardProps) => {
	const [progressBarWidth, setProgressBarWidth] = useState(
		(previousHp / activePokemon.stats[0].total) * 100
	);
	const [displayedHp, setDisplayedHp] = useState(previousHp);

	useEffect(() => {
		setDisplayedHp(previousHp);
		setProgressBarWidth((previousHp / activePokemon.stats[0].total) * 100);
	}, [currentView]);

	const animateHealthBar = () => {
		if (activePokemon.stats[0].value != previousHp) {
			const diff = previousHp - activePokemon.stats[0].value;
			const step = diff / 20;

			let currentHp: number = previousHp;

			const interval = setInterval(() => {
				currentHp =
					currentHp - step > activePokemon.stats[0].value
						? currentHp - step
						: activePokemon.stats[0].value;

				if (currentHp <= activePokemon.stats[0].value) {
					setPreviousHp(currentHp);
					clearInterval(interval);
				}

				setDisplayedHp(currentHp);
			}, 100);
		}
	};

	const animationPokemonInfos = async () => {
		if (currentNotification) {
			const { animationType } = currentNotification;

			if (
				(animationType === 'attack-player' && player) ||
				(animationType === 'attack-opponent' && !player) ||
				animationType === 'status-suffer'
			) {
				setProgressBarWidth(
					(activePokemon.stats[0].value / activePokemon.stats[0].total) *
						100
				);
				await new Promise(resolve => setTimeout(resolve, 2500));
				animateHealthBar();
			}
		}
	};

	useEffect(() => {
		animationPokemonInfos();
	}, [currentNotification, activePokemon, player]);

	return (
		<div
			className={`battle-pokemon-container ${player ? 'player' : 'opponent'}`}
		>
			<div className={`battle-pokemon-infos`}>
				<div className={'battle-pokemon-stat-top'}>
					<h3>{firstLetterMaj(activePokemon.name)}</h3>
					{activePokemon.gender === 'male' ? (
						<div
							className={`battle-pokemon-gender ${activePokemon.gender}`}
						>
							<FontAwesomeIcon icon={faMars} />
						</div>
					) : activePokemon.gender === 'female' ? (
						<div
							className={`battle-pokemon-gender ${activePokemon.gender}`}
						>
							<FontAwesomeIcon icon={faVenus} />
						</div>
					) : null}
					<div className={'battle-pokemon-level'}>
						<h3>Lv.{activePokemon.level}</h3>
					</div>
				</div>
				<div className={'progress-bar-container'}>
					<div
						className={`battle-pokemon-progress-bar ${player ? 'player' : 'opponent'}`}
					>
						<div
							className={'battle-pokemon-progress-bar-fill'}
							style={{
								width: `${progressBarWidth}%`,
								backgroundColor:
									displayedHp >
									Math.round(activePokemon.stats[0].total / 2)
										? 'var(--grass)'
										: displayedHp >
											  Math.round(activePokemon.stats[0].total / 3)
											? 'var(--electric)'
											: displayedHp >
												  Math.round(
														activePokemon.stats[0].total / 4
												  )
												? 'var(--fire)'
												: 'var(--fighting)',
								transition: isSwitching
									? 'none'
									: currentNotification?.animationType ===
												'attack-player' ||
										  currentNotification?.animationType ===
												'attack-opponent' ||
										  currentNotification?.animationType ===
												'status-suffer'
										? 'width 1.5s ease-in-out'
										: 'none',
								transitionDelay: isSwitching
									? '0s'
									: currentNotification?.animationType ===
												'attack-player' ||
										  currentNotification?.animationType ===
												'attack-opponent' ||
										  currentNotification?.animationType ===
												'status-suffer'
										? '2.5s'
										: '0s'
							}}
						></div>
					</div>
					<span>
						{Math.round(displayedHp)}/{activePokemon.stats[0].total}
					</span>
				</div>
			</div>
			<BattleStatus
				activePokemon={activePokemon}
				currentNotification={currentNotification}
				isSwitching={isSwitching}
			/>
			<div className={'battle-pokemon-avatar'}>
				<CustomImage
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${activePokemon.pokedexId}.png`}
					alt={activePokemon.name}
					width={250}
					height={250}
				/>
				<div
					className={`pokemon-shadow ${player ? 'player' : 'opponent'}`}
					style={{
						backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${activePokemon.pokedexId}.png)`
					}}
				></div>
			</div>
		</div>
	);
};

export default BattlePokemonCard;
