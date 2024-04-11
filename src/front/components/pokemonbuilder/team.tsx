'use client';
import React, { useState } from 'react';
import IPokemon, { IPokemonRequest } from '../../../interfaces/IPokemon';
import PokemonList from './pokemonList';
import PokedexList from './pokedexList';
import ITeamResponse from '../../../interfaces/ITeam';

interface TeamProps {
	team: ITeamResponse;
	pokemons: IPokemonRequest;
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

	return (
		<div>
			<h1>{team.name}</h1>
			{teamData.pokemons === null ? (
				<div>No pokemons in this team</div>
			) : (
				<ul>
					<PokemonList team={teamData} />
				</ul>
			)}
			<PokedexList addToTeam={addToTeam} pokemons={pokemons} />
		</div>
	);
};

export default Team;
