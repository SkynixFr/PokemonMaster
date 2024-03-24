// Component
import CustomImage from './customImage';

// Types
import Team from '../../types/Team';

// Utils
import { PokemonImgByPokemonId } from '../../utils/pokemonImgByPokemonId';

// Styles
import '../../styles/components/battleTeam.css';
interface BattleTeamProps {
	team: Team;
}
const battleTeam = ({ team }: BattleTeamProps) => {
	return (
		<div className="battle-team-container">
			<div className="avatar">
				<CustomImage
					src={team.avatar}
					alt="Battle team avatar"
					priority={true}
					fill={false}
					width={120}
					height={200}
					objectFit="contain"
				/>
			</div>

			<div className="content">
				<h3>{team.name}</h3>
				<div className="battle-team-pokemons">
					{team.pokemons.map(pokemon => (
						<div key={pokemon.id}>
							<CustomImage
								src={PokemonImgByPokemonId[pokemon.id]}
								alt={`${pokemon.name} sprite`}
								priority={true}
								fill={false}
								width={40}
								height={40}
								objectFit="contain"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default battleTeam;
