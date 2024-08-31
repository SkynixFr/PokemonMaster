//Classes
import Pokemon from '../../../back/classes/pokemon';
import CustomImage from '../customImage';
import { firstLetterMaj } from '../../utils/formatString';

//Interfaces
interface BattlePokemonCardProps {
	activePokemon: Pokemon;
}

const BattlePokemonCard = ({ activePokemon }: BattlePokemonCardProps) => {
	return (
		<div className={'battle-pokemon-container'}>
			<div className={'battle-pokemon-infos'}>
				<div>
					<h3>Level {activePokemon.level}</h3>
				</div>
				<div>
					<div>
						<h2>{firstLetterMaj(activePokemon.name)}</h2>
						{activePokemon.gender === 'male' ? (
							<CustomImage
								src={'/images/icons/male.svg'}
								alt={'Pokemon gender'}
								width={20}
								height={20}
							/>
						) : activePokemon.gender === 'female' ? (
							<CustomImage
								src={'/images/icons/female.svg'}
								alt={'Pokemon gender'}
								width={20}
								height={20}
							/>
						) : null}
					</div>
				</div>
			</div>
			<div className={'battle-pokemon-avatar'}>
				<CustomImage
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${activePokemon.pokedexId}.png`}
					alt={activePokemon.name}
					width={250}
					height={250}
				/>
			</div>
		</div>
	);
};

export default BattlePokemonCard;
