import Image from 'next/image';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { firstLetterMaj } from '../../utils/formatString';
import { Stars } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
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
							<div className={'team-details-pokemon-info'}>
								<div className={'top-details'}>
									<div className={'bg-pokemon-details'}></div>
									<div className={'pokemon-infos'}>
										<div className={'pokemon-infos-top'}>
											<div className={'pokemon-infos-left'}>
												<h3>#{pokemon.pokedexId}</h3>
												<h1>{firstLetterMaj(pokemon.name)}</h1>
												<div className={'pokemon-infos-types'}>
													{pokemon.types.map((type, index) => (
														<div
															key={index}
															className={`pokemon-infos-type ${type.name}`}
														>
															{firstLetterMaj(type.name)}
														</div>
													))}
												</div>
											</div>
											<div className={'pokemon-infos-right'}>
												<div
													className={'pokemon-infos-right-level'}
												>
													<span>LVL</span>
													{pokemon.level}
												</div>
												{pokemon.isShiny ? (
													<div
														className={`pokemon-infos-right-shiny`}
													>
														<Stars width={20} height={20} />
													</div>
												) : (
													''
												)}
												{pokemon.gender != 'neutral' ? (
													<div
														className={`pokemon-infos-right-gender ${
															pokemon.gender === 'male'
																? 'male'
																: 'female'
														}`}
													>
														{pokemon.gender === 'male' ? (
															<FontAwesomeIcon icon={faMars} />
														) : (
															<FontAwesomeIcon icon={faVenus} />
														)}
													</div>
												) : (
													''
												)}
											</div>
										</div>
										<div className={'pokemon-ability-nature'}>
											<div>
												<h3>Nature</h3>
												<div>
													{firstLetterMaj(pokemon.nature.name)}
												</div>
											</div>
											<div>
												<h3>Ability</h3>
												<div>
													{firstLetterMaj(pokemon.ability.name)}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className={'pokemon-item'}>
									<div>
										{pokemon.item != null
											? pokemon.item.name
											: 'No item'}
									</div>
								</div>
								<div className={'pokemon-moves'}>
									{pokemon.moves.map((move, index) => (
										<div key={index}>{move.name}</div>
									))}
								</div>
								{/*<div className={'pokemon-stats'}>*/}
								{/*	{pokemon.stats.map((stat, index) => (*/}
								{/*		<div key={index}>*/}
								{/*			<p>{stat.name}</p>*/}
								{/*			<p>{stat.total}</p>*/}
								{/*		</div>*/}
								{/*	))}*/}
								{/*</div>*/}
							</div>
						</div>
					))}
				</div>
			</div>
		)
	);
};

export default TeamDetails;
