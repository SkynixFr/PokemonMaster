'use client';
import React, { useState } from 'react';
import ITeam from '../../../interfaces/ITeam';
import IPokemon from '../../../interfaces/IPokemon';
import PokemonList from './pokemonList';
import PokedexList from './pokedexList';
interface TeamProps {
	team: ITeam;
	saveTeam?: (team: ITeam) => Promise<string>;
	pokemons: IPokemon[];
}

const Team: React.FC<TeamProps> = ({ team, saveTeam, pokemons }) => {
	const [teamData, setTeamData] = useState<ITeam>(team);

	const addToTeam = (pokemon: IPokemon) => {
		console.log(pokemon);
		if (teamData.pokemons.length >= 6) return;
		setTeamData(prev => ({
			...prev,
			pokemons: [...prev.pokemons, pokemon]
		}));
	};

	return (
		<div>
			<h1>{team.name}</h1>

			{teamData.pokemons.length === 0 ? (
				<div>No pokemons in this team</div>
			) : (
				<ul>
					<PokemonList team={teamData} saveTeam={saveTeam} />
				</ul>
			)}
			<PokedexList pokemons={pokemons} addToTeam={addToTeam} />
		</div>
	);
};

export default Team;
