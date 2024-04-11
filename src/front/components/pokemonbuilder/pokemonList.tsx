'use client';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import { PokemonImgByPokemonId } from '../../utils/pokemonImgByPokemonId';
import ITeam from '../../../interfaces/ITeam';
import { useState } from 'react';

interface PokemonListProps {
	team: ITeam;
	saveTeam?: (team: ITeam) => Promise<string>;
}

const PokemonList = ({ team, saveTeam }: PokemonListProps) => {
	const [apiMessage, setApiMessage] = useState<string>('');
	const handleSaveTeam = async (team: ITeam) => {
		setApiMessage(await saveTeam(team));
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
				<button onClick={() => handleSaveTeam(team)}>Save</button>
			</ul>
			{apiMessage && <p>{apiMessage}</p>}
		</div>
	);
};

export default PokemonList;
