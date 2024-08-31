import Pokemon from '../../../back/classes/pokemon';
import Team from '../../../back/classes/team';
import CustomImage from '../customImage';

interface TeamCardProps {
	team: Team;
	activePokemon: Pokemon;
	setActivePokemon: (pokemon: Pokemon) => void;
}

const BattleTeamCard = ({
	team,
	activePokemon,
	setActivePokemon
}: TeamCardProps) => {
	return (
		<div className={'battle-team-container'}>
			<div className={'battle-team-avatar'}>
				<CustomImage
					src={team.avatar.sprite}
					alt={`avatar-player-${team.avatar.name}`}
					width={150}
					height={250}
				/>
			</div>
			<div className={'battle-team-pokemons'}>
				{team.pokemons.map((pokemon: Pokemon) => (
					<div
						key={pokemon.name}
						className={`battle-team-pokemon ${
							pokemon.name === activePokemon.name ? 'active' : ''
						}`}
					>
						<CustomImage
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
							alt={pokemon.name}
							width={30}
							height={30}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default BattleTeamCard;
