'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';

// Icons
import { Moon, Shield, Sun, Timer, Wind } from 'lucide-react';

// Components
import CustomImage from '../components/customImage';
import BattleTeam from '../components/battleTeam';

const Battle = () => {
	// const dispatch = useDispatch();
	const teamOne = useSelector((state: RootState) => state.teams.teams[0]);
	const teamTwo = useSelector((state: RootState) => state.teams.teams[1]);
	const [theme, setTheme] = useState('day');
	const [turn, setTurn] = useState(1);
	const [toastMessage, setToastMessage] = useState('Arcanin uses');
	const [toastImportantMessage, setToastImportantMessage] =
		useState('Fire Blast');
	const toggleTheme = () => {
		setTheme(theme === 'day' ? 'night' : 'day');
	};

	if (!teamOne || !teamTwo) {
		return <div>Loading...</div>;
	}

	return (
		<div className="battle-container">
			<CustomImage
				src={`/images/backgrounds/bg-battle-${theme}-upscale.jpg`}
				alt="Battle background"
				fill={true}
				priority={true}
				objectFit="cover"
				className="battle-background"
			/>

			<div className="battle-content left">
				<h2>Turn {turn}</h2>
				<BattleTeam team={teamOne} />
			</div>

			<div className="battle-content center">
				<div className="battle-notification">
					<CustomImage
						src={teamTwo.avatar}
						alt="Avatar notification"
						fill={false}
						priority={true}
						objectFit="contain"
						width={60}
						height={100}
					/>
					<h2>
						{toastMessage} <span>{toastImportantMessage}</span> !
					</h2>
				</div>
			</div>

			<div className="battle-content right">
				<BattleTeam team={teamTwo} />
				<button className="battle-timer">
					<Timer />
				</button>
			</div>

			<div className="theme-btn" onClick={toggleTheme}>
				{theme === 'day' ? <Moon /> : <Sun />}
			</div>

			<div className="battle-game-status">
				<button>
					<Shield />
				</button>
				<button>
					<Wind />
				</button>
			</div>

			<div className="battle-buttons">
				<button>Attack</button>
				<button>Surrender</button>
				<button>Chat</button>
				<button>Team</button>
			</div>

			<div className="battle-pokemon">Pokemon 1</div>

			<div className="battle-pokemon">Pokemon 2</div>
		</div>
	);
};

export default Battle;
