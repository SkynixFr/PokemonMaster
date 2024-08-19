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

	useEffect(() => {
		const currentIndex = (currentPage - 1) * NUMBER_OF_POKEMONS;
		const endIndex = currentIndex + NUMBER_OF_POKEMONS;
		setDisplayPokemons(currentPokemons.slice(currentIndex, endIndex));
		setPokemonActive(currentPokemons[currentIndex]);
	}, [currentPage, currentPokemons]);

	const handleDeletePokemon = (index: number) => {
		const newTeam = { ...teamActive };
		newTeam.pokemons.splice(index, 1);
		setTeamActive(newTeam);
		setPokemonActive(displayPokemons[0]);
	};

	const handleSaveTeam = (team: TeamEntity) => {
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

	return (
		<>
			<Team teamActive={teamActive} saveTeam={handleSaveTeam} />
			<div className={'pokemons-infos'}>
				<div className={'pokemons'}>
					<div className={'team-pokemons'}>
						<div className={'list-team-pokemons'}>
							{teamActive.pokemons && teamActive.pokemons.length > 0 ? (
								Array.from({ length: 6 }).map((_, index) => {
									const pokemon = teamActive.pokemons[index];
									return pokemon ? (
										<div
											className={`team-pokemon ${isFromTeam && activePokemonIndex === index ? 'active' : ''}`}
											onClick={() =>
												handlePokemonActive(pokemon, true, index)
											}
											key={pokemon.name}
										>
											<div className={'team-pokemon-img'}>
												<CustomImage
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
													alt={pokemon?.name}
													width={80}
													height={80}
												/>
											</div>
											<button
												className={'remove-pokemon'}
												onClick={() => handleDeletePokemon(index)}
											>
												<X width={30} height={30} />
											</button>
										</div>
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
				<PokemonDetails
					pokemon={pokemonActive}
					team={team}
					teamActive={teamActive}
					setTeamActive={setTeamActive}
					isFromTeam={isFromTeam}
				/>
			</div>
		</>
	);
};

export default Pokemons;
