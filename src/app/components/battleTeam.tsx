// Component
import CustomImage from './customImage';

// Types
import Team from '../../types/Team';

interface BattleTeamProps {
	team: Team;
}
const battleTeam = ({ team }: BattleTeamProps) => {
	console.log('team', team);
	return (
		<div className="battle-team-container">
			<div className="avatar-container">
				<CustomImage
					src={team.avatar}
					alt="Battle team avatar"
					priority={true}
					fill={true}
					objectFit="contain"
					className="avatar"
				/>
			</div>
			<div className="team-name">
				<h3>{team.name}</h3>
			</div>
			<div className="pokemons-container">
				{team.pokemons.map(pokemon => (
					<div key={pokemon.id} className="pokemon-container">
						<CustomImage
							src={pokemon.sprites.front_default}
							alt={`${pokemon.name} sprite`}
							priority={true}
							fill={false}
							width={50}
							height={50}
							objectFit="contain"
							className="pokemon-sprite"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default battleTeam;
