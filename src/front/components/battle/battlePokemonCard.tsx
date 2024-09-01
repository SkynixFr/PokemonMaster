//Classes
import Pokemon from '../../../back/classes/pokemon';
import CustomImage from '../customImage';
import { firstLetterMaj } from '../../utils/formatString';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Interfaces
interface BattlePokemonCardProps {
	activePokemon: Pokemon;
	player?: boolean;
}

const BattlePokemonCard = ({
	activePokemon,
	player
}: BattlePokemonCardProps) => {
	return (
		<div className={'battle-pokemon-container'}>
			<div className={'battle-pokemon-infos'}>
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
					<div className={'battle-pokemon-progress-bar'}>
						<div
							className={'battle-pokemon-progress-bar-fill'}
							style={{
								width: `${activePokemon.stats[0].value}%`,
								backgroundColor:
									activePokemon.stats[0].value * 100 > 75
										? 'var(--grass)'
										: activePokemon.stats[0].value * 100 > 50
											? 'var(--electric)'
											: activePokemon.stats[0].value * 100 > 25
												? 'var(--fire)'
												: 'var(--fighting)'
							}}
						></div>
					</div>
					<span>
						{activePokemon.stats[0].value}/{activePokemon.stats[0].total}
					</span>
				</div>
			</div>

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
