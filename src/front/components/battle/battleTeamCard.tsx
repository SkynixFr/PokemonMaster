// Classes
import Pokemon from '../../../back/classes/pokemon';
import Team from '../../../back/classes/team';

// Components
import CustomImage from '../customImage';

//Interfaces
interface TeamCardProps {
	team: Team;
	activePokemon: Pokemon;
	setActivePokemon: (pokemon: Pokemon) => void;
	recreatePokemonFromParsed: (pokemon: Pokemon) => Pokemon;
	player?: boolean;
}

const BattleTeamCard = ({
	team,
	activePokemon,
	setActivePokemon,
	recreatePokemonFromParsed,
	player
}: TeamCardProps) => {
	const handleSwitchPokemon = (pokemon: Pokemon) => {
		const newPokemon = recreatePokemonFromParsed(pokemon);
		setActivePokemon(newPokemon);
	};

	return (
		<div
			className={`battle-team-container ${player ? 'player' : 'opponent'}`}
		>
			<div className={'battle-team-avatar'}>
				<CustomImage
					src={team.avatar.sprite}
					alt={`avatar-player-${team.avatar.name}`}
					width={150}
					height={250}
				/>
			</div>
			<div className={'battle-team-infos'}>
				<h2>{team.name}</h2>
				<div className={'battle-team-pokemons'}>
					{team.pokemons.map((pokemon: Pokemon) => (
						<div
							key={pokemon.name}
							className={`battle-team-pokemon ${
								pokemon.name === activePokemon.name ? 'active' : ''
							}`}
							onClick={() => handleSwitchPokemon(pokemon)}
						>
							<CustomImage
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.pokedexId}.gif`}
								alt={pokemon.name}
								width={40}
								height={40}
								unoptimized={true}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BattleTeamCard;
