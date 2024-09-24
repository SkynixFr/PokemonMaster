// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { firstLetterMaj } from '../../utils/formatString';
import { Stars } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import CustomImage from '../customImage';
import { useRouter } from 'next/navigation';
import { createBattle } from '../../utils/battle/battle';
interface TeamDetailsProps {
	team: TeamEntity;
}

const TeamDetails = ({ team }: TeamDetailsProps) => {
	const router = useRouter();
	const handleBattle = (team: TeamEntity) => {
		const battle = createBattle(team);
		localStorage.setItem('battle', JSON.stringify(battle));
		router.push('/battle');
	};

	return (
		team && (
			<div className={'team-details-container'}>
				<h1>{team.name}</h1>
				<div className={`team-details-avatar ${team.avatar.name}`}>
					<CustomImage
						src={team.avatar.sprite}
						alt={team.avatar.name}
						width={1000}
						height={800}
						sizes={'100vw'}
					/>
				</div>
				<div className={'team-details-pokemons'}>
					{team.pokemons.map((pokemon, index) => (
						<div key={index} className={`team-details-pokemon ${index}`}>
							<div></div>
							<div className={'team-details-pokemon-bg'}>
								<CustomImage
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
									alt={pokemon.name}
									width={500}
									height={500}
									sizes={'100vw'}
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
												{pokemon.item != null ? (
													<div className={'pokemon-item'}>
														<div>{pokemon.item.name}</div>
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

								<div className={'pokemon-moves'}>
									<h3>Moves</h3>
									<div className={'pokemon-moves-container'}>
										{pokemon.moves.map((move, index) => (
											<div
												className={
													'pokemon-move-fullfilled default'
												}
												key={index}
											>
												<CustomImage
													src={`/images/types/${move.type}.png`}
													alt={move.type}
													width={20}
													height={20}
												/>

												<div
													className={
														'pokemon-move-fullfilled infos'
													}
												>
													<div>{firstLetterMaj(move.name)}</div>
													<div>
														{move.pp}/{move.pp}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className={'pokemon-stats'}>
									<h3>Stats</h3>
									<div className={'pokemon-stats-container'}>
										{pokemon.stats.map((stat, index) => (
											<div
												key={index}
												className={`pokemon-stat ${stat.name}`}
											>
												<div className={'pokemon-stat-name'}>
													{stat.name === 'special-attack'
														? 'SPA'
														: stat.name === 'special-defense'
															? 'SPD'
															: stat.name === 'attack'
																? 'ATK'
																: stat.name === 'speed'
																	? 'SPE'
																	: stat.name === 'defense'
																		? 'DEF'
																		: stat.name.toUpperCase()}
												</div>

												<div className={'pokemon-stat-total'}>
													{stat.total}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={'battle-btn-container'}>
					<button
						className={'battle-btn btn-primary'}
						onClick={() => handleBattle(team)}
					>
						Battle
						<CustomImage
							src={'/images/other/pikachu-battle.png'}
							alt={'pikachu battle'}
							width={40}
							height={40}
						/>
					</button>
				</div>
			</div>
		)
	);
};

export default TeamDetails;
