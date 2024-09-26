'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import Pokedex from './pokedex';
import PokemonDetails from './pokemonDetails';

// Icons
import { SaveAll, X } from 'lucide-react';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
import CustomImage from '../customImage';
import { TeamUpdate } from '../../../interfaces/team/teamUpdate';
import { toast } from 'sonner';
import { addPokemonToTeam } from '../../actions/team.actions';
import Team from './team';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { firstLetterMaj } from '../../utils/formatString';

interface PokemonsProps {
	team: TeamEntity;
	pokemons: PokemonEntity[];
}

// Utils
const NUMBER_OF_POKEMONS = 12;

const Pokemons = ({ team, pokemons }: PokemonsProps) => {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPokemons, setCurrentPokemons] = useState(pokemons);
	const [displayPokemons, setDisplayPokemons] = useState(
		pokemons.slice(0, NUMBER_OF_POKEMONS)
	);
	const totalPages = Math.ceil(currentPokemons.length / NUMBER_OF_POKEMONS);
	const [pokemonActive, setPokemonActive] = useState<PokemonEntity>(
		currentPokemons[0]
	);
	const [teamActive, setTeamActive] = useState<TeamEntity>(team);
	const [isFromTeam, setIsFromTeam] = useState<boolean>(false);
	const [activePokemonIndex, setActivePokemonIndex] = useState<number | null>(
		null
	);
	const [openModal, setOpenModal] = useState(false);
	const [index, setIndex] = useState<number>(0);

	useEffect(() => {
		const currentIndex = (currentPage - 1) * NUMBER_OF_POKEMONS;
		const endIndex = currentIndex + NUMBER_OF_POKEMONS;
		setDisplayPokemons(currentPokemons.slice(currentIndex, endIndex));
		setPokemonActive(currentPokemons[currentIndex]);
	}, [currentPage, currentPokemons]);

	const handleDeletePokemon = (index: number) => {
		console.log('index', index);
		if (teamActive.pokemons.length === 1) {
			return toast.error('You must have at least one pokemon in your team');
		}
		const newTeam = { ...teamActive };
		newTeam.pokemons.splice(index, 1);
		setTeamActive(newTeam);
		setPokemonActive(teamActive.pokemons[0]);
		setOpenModal(false);
	};

	const handleSaveTeam = (team: TeamEntity) => {
		if (team.name.length < 3 || team.name.length > 20) {
			return toast.error('Team name must be between 3 and 20 characters');
		}

		if (team.pokemons.length < 1) {
			return toast.error('You must have at least one pokemon in your team');
		}

		if (
			team.pokemons.some(
				(pokemon, index, self) =>
					self.findIndex(
						p => p.name === pokemon.name && pokemon.name !== ''
					) !== index
			)
		) {
			return toast.error(
				'You cannot have the same pokemon twice in your team'
			);
		}

		const teamNameRegex: RegExp = /^[a-zA-Z0-9._\-\s]*$/;

		if (!teamNameRegex.test(team.name)) {
			return toast.error(
				'Team name must contain only letters, numbers, spaces, dots and dashes'
			);
		}

		const newTeam: TeamUpdate = {
			name: team.name,
			avatarId: team.avatar.id,
			pokemons: team.pokemons
		};

		toast.promise(addPokemonToTeam(team.id, newTeam), {
			loading: 'Saving team...',
			success: response => {
				if (response.status) {
					throw new Error(response.message);
				}
				setTeamActive(response);
				router.push('/teambuilder');
				router.refresh();
				return `${response.name} saved !`;
			},
			error: error => {
				return error.message;
			}
		});
	};

	const handlePokemonActive = (
		pokemon: PokemonEntity,
		isFromTeam: boolean,
		index: number | null
	) => {
		setPokemonActive(pokemon);
		setIsFromTeam(isFromTeam);
		if (isFromTeam) {
			setActivePokemonIndex(index);
		} else {
			setActivePokemonIndex(null);
		}
	};

	const reorder = (list: PokemonEntity[], startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result: any) => {
		if (!result.destination) return;

		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;
		const items: PokemonEntity[] = reorder(
			teamActive.pokemons,
			sourceIndex,
			destinationIndex
		);

		setTeamActive({ ...teamActive, pokemons: items });
	};

	return (
		<>
			<Team
				teamActive={teamActive}
				saveTeam={handleSaveTeam}
				setTeamActive={setTeamActive}
			/>
			<div className={'pokemons-infos'}>
				<div className={'pokemons'}>
					<div className={'team-pokemons'}>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable
								droppableId={'horizontal-list-pokemon'}
								direction={'horizontal'}
							>
								{provided => (
									<div
										className={'list-team-pokemons'}
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{teamActive.pokemons &&
										teamActive.pokemons.length > 0 ? (
											Array.from({ length: 6 }).map((_, index) => {
												const pokemon = teamActive.pokemons[index];
												return pokemon ? (
													<Draggable
														key={pokemon.name}
														draggableId={pokemon.name}
														index={index}
													>
														{(provided, snapshot) => (
															<div
																className={`team-pokemon ${isFromTeam && activePokemonIndex === index ? 'active' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
																onClick={() =>
																	handlePokemonActive(
																		pokemon,
																		true,
																		index
																	)
																}
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<div
																	className={
																		'team-pokemon-img'
																	}
																>
																	<CustomImage
																		src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
																		alt={pokemon?.name}
																		width={80}
																		height={80}
																	/>
																</div>
																<button
																	className={'remove-pokemon'}
																	onClick={() => {
																		setOpenModal(true);
																		setIndex(index);
																	}}
																>
																	<X width={30} height={30} />
																</button>
															</div>
														)}
													</Draggable>
												) : (
													<div key={index}>
														<CustomImage
															src={'/images/other/pokeball.png'}
															alt={'pokeball close'}
															width={60}
															height={60}
														/>
													</div>
												);
											})
										) : (
											<h3>No pokemons in your team</h3>
										)}
									</div>
								)}
							</Droppable>
						</DragDropContext>
						<button
							className={'team-pokemons-save'}
							onClick={() => handleSaveTeam(teamActive)}
						>
							<SaveAll width={20} height={20} />
						</button>
					</div>
					<Pokedex
						pokemons={pokemons}
						currentPokemons={displayPokemons}
						setCurrentPokemons={setCurrentPokemons}
						pokemonActive={pokemonActive}
						setPokemonActive={setPokemonActive}
						isFromTeam={isFromTeam}
						setIsFromTeam={setIsFromTeam}
						totalPages={totalPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>
				{currentPokemons.length > 0 && pokemonActive && (
					<PokemonDetails
						pokemon={pokemonActive}
						team={team}
						teamActive={teamActive}
						setTeamActive={setTeamActive}
						isFromTeam={isFromTeam}
					/>
				)}
			</div>
			{openModal && (
				<div className={'modal-delete-pokemon-container'}>
					<div className={'modal-delete-pokemon-content'}>
						<h1>
							Are you sure you want to delete{' '}
							<span>
								{firstLetterMaj(teamActive.pokemons[index].name)}
							</span>{' '}
							?
						</h1>
						<span>A delete is irreversible.</span>
						<div className={'modal-delete-pokemon-btn-container'}>
							<button
								className={'btn-secondary'}
								onClick={() => handleDeletePokemon(index)}
							>
								Yes
							</button>
							<button
								className={'btn-primary'}
								onClick={() => setOpenModal(false)}
							>
								No
							</button>
						</div>
						<button
							className={'close-btn'}
							onClick={() => setOpenModal(false)}
						>
							<X width={30} height={30} />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Pokemons;
