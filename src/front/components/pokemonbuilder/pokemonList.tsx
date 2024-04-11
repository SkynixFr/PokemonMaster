'use client';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import { PokemonImgByPokemonId } from '../../utils/pokemonImgByPokemonId';
import { ITeamUpdate } from '../../../interfaces/ITeam';
import { useState } from 'react';
import ITeamResponse from '../../../interfaces/ITeam';
import { saveTeam } from '../../actions/teams.actions';

interface PokemonListProps {
	team: ITeamResponse;
}

const PokemonList = ({ team }: PokemonListProps) => {
	const [apiMessage, setApiMessage] = useState<string>('');
	const handleSaveTeam = async (teamId: string, team: ITeamResponse) => {
		const newTeam: ITeamUpdate = {
			name: team.name,
			avatarId: team.avatar.id,
			pokemons: team.pokemons
		};
		console.log(newTeam);
		const response = await saveTeam(teamId, newTeam);
		console.log(response);
	};
	return (
		<div>
			<ul
				style={{
					display: 'flex',
					gap: '50px'
				}}
			>
				{team.pokemons.map((pokemon: IPokemon, index) => (
					<li key={index}>
						<CustomImage
							src={PokemonImgByPokemonId[pokemon.id]}
							alt={pokemon.name}
							priority={true}
							width={50}
							height={50}
							objectFit={'contain'}
						/>
						<div>
							<span>#{pokemon.id} </span>
							{pokemon.name}
						</div>
					</li>
				))}
				<button onClick={() => handleSaveTeam(team.id, team)}>Save</button>
			</ul>
			{apiMessage && <p>{apiMessage}</p>}
		</div>
	);
};

export default PokemonList;
