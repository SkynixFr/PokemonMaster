import Image from 'next/image';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
interface TeamDetailsProps {
	team: TeamEntity;
}

const TeamDetails = ({ team }: TeamDetailsProps) => {
	return (
		team && (
			<div className={'team-details-container'}>
				<h1>{team.name}</h1>
				<div className={'team-details-avatar'}>
					<Image
						src={team.avatar.sprite}
						alt={team.avatar.name}
						width={1000}
						height={700}
						priority={true}
						quality={100}
						sizes={'100vw'}
						style={{ objectFit: 'contain' }}
					/>
				</div>
				<div className={'team-details-pokemons'}>
					{team.pokemons.map((pokemon, index) => (
						<div key={index} className={`team-details-pokemon ${index}`}>
							<div className={'team-details-pokemon-bg'}>
								<Image
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
									alt={pokemon.name}
									width={500}
									height={500}
									priority={true}
									quality={100}
									sizes={'100vw'}
									style={{ objectFit: 'contain' }}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	);
};

export default TeamDetails;
