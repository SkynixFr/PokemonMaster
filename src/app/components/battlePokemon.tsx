import { useState } from 'react';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

// Component
import CustomImage from './customImage';

// Types
import Pokemon from '../../types/Pokemon';
import BattleEffect from '../../types/BattleEffect';

// Styles
import '../../styles/components/battlePokemon.css';

// Icons
import FemaleIcon from '../../../public/images/icons/female.svg';
import MaleIcon from '../../../public/images/icons/male.svg';
import CustomProgressBar from './customProgressBar';
import { PokemonImgByPokemonId } from '../../utils/pokemonImgByPokemonId';

interface BattlePokemonProps {
	activePokemon: Pokemon;
	battleEffects: BattleEffect[];
	player?: boolean;
}

const BattlePokemon = ({
	activePokemon,
	battleEffects,
	player = false
}: BattlePokemonProps) => {
	const [currentHp, setCurrentHp] = useState<number>(0);

	return (
		<div className="pokemon-container">
			<div>
				<div className="pokemon-infos">
					<span>{activePokemon.level}</span>
					<div className="pokemon-stats">
						<div>
							<h4>{firstLetterMaj(activePokemon.name)}</h4>
							<span>
								{activePokemon.gender === 'M' ? (
									<CustomImage
										src={MaleIcon}
										alt="Female gender"
										width={50}
										height={50}
										priority={true}
									/>
								) : activePokemon.gender === 'F' ? (
									<CustomImage
										src={FemaleIcon}
										alt="Female gender"
										width={50}
										height={50}
										priority={true}
									/>
								) : (
									''
								)}
							</span>
						</div>

						<div>
							<CustomProgressBar
								currentProgress={activePokemon.stats.currentHp}
								maxProgress={activePokemon.stats.hp}
							/>
							{activePokemon.stats.currentHp}/{activePokemon.stats?.hp}
						</div>
					</div>
				</div>
				<div className="battle-effects">
					<div className="battle-effects-content">
						{battleEffects.map(effect => (
							<>
								{effect.type === 'status' && effect.name === 'BRU' && (
									<span className="burn" key={effect.name}>
										<CustomImage
											src="/images/types/fire.png"
											alt="Type fire"
											width={15}
											height={15}
										/>
										{effect.name}
									</span>
								)}
								{effect.type === 'status' && effect.name === 'PAR' && (
									<span className="paralisys" key={effect.name}>
										<CustomImage
											src="/images/types/electric.png"
											alt="Type fire"
											width={15}
											height={15}
										/>
										{effect.name}
									</span>
								)}
							</>
						))}

						{battleEffects.map(effect => (
							<>
								{effect.type === 'buff' && (
									<span className="buff" key={effect.name}>
										x{effect.number} {effect.name}
									</span>
								)}
							</>
						))}
						{battleEffects.map(effect => (
							<>
								{effect.type === 'debuff' && (
									<span className="debuff" key={effect.name}>
										x{effect.number} {effect.name}
									</span>
								)}
							</>
						))}
					</div>
				</div>
			</div>

			<div>
				<CustomImage
					src={PokemonImgByPokemonId[activePokemon.id]}
					alt={`${activePokemon.name} sprite`}
					priority={true}
					fill={false}
					width={200}
					height={200}
					objectFit="contain"
					className={`pokemon-sprite ${player ? 'player' : ''}`}
				/>

				<div
					className={`pokemon-shadow ${player ? 'player' : 'opponent'}`}
					style={{
						backgroundImage: `url(${PokemonImgByPokemonId[activePokemon.id]}`
					}}
				></div>
			</div>
		</div>
	);
};

export default BattlePokemon;
