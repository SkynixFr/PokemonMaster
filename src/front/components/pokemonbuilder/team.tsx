'use client';
import React, { useState } from 'react';
import IPokemon from '../../../interfaces/IPokemon';
import PokemonList from './pokemonList';
import PokedexList from './pokedexList';
import ITeamResponse from '../../../interfaces/ITeam';

interface TeamProps {
	team: ITeamResponse;
	pokemons: IPokemon[];
}

const Team: React.FC<TeamProps> = ({ team, pokemons }) => {
	const [teamData, setTeamData] = useState<ITeamResponse>(team);

	const addToTeam = (pokemon: IPokemon) => {
		if (teamData.pokemons?.length >= 6) return;
		setTeamData(prev => ({
			...prev,
			pokemons: [...(prev.pokemons || []), pokemon]
		}));
	};

	const removeFromTeam = (pokemon: IPokemon, index: number) => {
		setTeamData(prev => ({
			...prev,
			pokemons: prev.pokemons.filter((p, i) => i !== index)
		}));
	};

	return (
		<div>
			<h1>{team.name}</h1>
			{teamData.pokemons === null ? (
				<div>No pokemons in this team</div>
			) : (
				<ul>
					<PokemonList team={teamData} removeFromTeam={removeFromTeam} />
				</ul>
			)}
			<PokedexList pokemons={pokemons} addToTeam={addToTeam} />
		</div>
	);
};

export default Team;