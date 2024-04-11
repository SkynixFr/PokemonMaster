'use client';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import { PokemonImgByPokemonId } from '../../utils/pokemonImgByPokemonId';
import { ITeamUpdate } from '../../../interfaces/ITeam';
import { useState } from 'react';
import ITeamResponse from '../../../interfaces/ITeam';
import { saveTeam } from '../../actions/teams.actions';
import { useRouter } from 'next/navigation';

interface PokemonListProps {
	team: ITeamResponse;
	removeFromTeam: (pokemon: IPokemon, index: number) => void;
}

const PokemonList = ({ team, removeFromTeam }: PokemonListProps) => {
	const router = useRouter();
	const [apiMessage, setApiMessage] = useState<string>('');
	const handleSaveTeam = async (teamId: string, team: ITeamResponse) => {
		const newTeam: ITeamUpdate = {
			name: team.name,
			avatarId: team.avatar.id,
			pokemons: team.pokemons
		};
		await saveTeam(teamId, newTeam);
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
						<button onClick={() => removeFromTeam(pokemon, index)}>
							X
						</button>
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
				{team.pokemons.length === 0 && <p>No pokemons in this team</p>}
				{team.pokemons.length > 0 && (
					<button
						onClick={() => {
							handleSaveTeam(team.id, team);
							router.push('/teambuilder');
						}}
					>
						Save
					</button>
				)}
			</ul>
			{apiMessage && <p>{apiMessage}</p>}
		</div>
	);
};

export default PokemonList;
