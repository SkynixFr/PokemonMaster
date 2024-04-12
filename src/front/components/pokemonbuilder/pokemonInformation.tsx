'use client';
import { useEffect, useState } from 'react';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';
import { getPokemonById } from '../../actions/pokedex.actions';
import { firstLetterMaj } from '../../utils/formatString';

interface PokemonInformationProps {
	pokemonId: number;
	addToTeam?: (pokemon: IPokemon) => void;
}

const PokemonInformation = ({
	pokemonId,
	addToTeam
}: PokemonInformationProps) => {
	const [pokemon, setPokemon] = useState<IPokemon>(null);

	useEffect(() => {
		const fetchPokemonData = async () => {
			const data = await getPokemonById(pokemonId);
			setPokemon(data);
		};

		fetchPokemonData().then(() => console.log('Pokemon fetched'));
	}, [pokemonId]);

	if (!pokemon) {
		return <div>Loading...</div>;
	}
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<h1>
				#{pokemon.id} : {firstLetterMaj(pokemon.name)}
			</h1>
			<CustomImage
				src={pokemon.sprite}
				alt={pokemon.name}
				priority={true}
				width={200}
				height={200}
				objectFit={'contain'}
			/>
			<div
				style={{
					width: '80%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'flex-start'
				}}
			>
				<h2>Types:</h2>
				<ul>
					{pokemon.types.map(type => (
						<li key={type.name}>{type.name}</li>
					))}
				</ul>
				<span>Level : {pokemon.level}</span>
				<span>Gender : {pokemon.gender}</span>

				<span>Shiny : {pokemon.isShiny ? 'Yes' : 'No'}</span>
				<h2>Item</h2>
				{pokemon.item.name && pokemon.item.name === 'No item' ? (
					<span>No item</span>
				) : (
					<span>{pokemon.item.name}</span>
				)}
				<h2>Nature</h2>
				<span> {pokemon.nature}</span>
				<h2>Ability</h2>
				<span>{pokemon.ability.name}</span>
				<div>
					<h2>Moves</h2>
					<ul>
						{pokemon.moves.map(move => (
							<li key={move.name}>{move.name}</li>
						))}
					</ul>
				</div>
				<div>
					<h2>Stats</h2>
					<ul>
						{pokemon.stats.map(stat => (
							<li key={stat.name}>
								{stat.name} : {stat.value}
							</li>
						))}
					</ul>
				</div>
				<button
					onClick={() => {
						addToTeam(pokemon);
					}}
				>
					Add to team
				</button>
			</div>
		</div>
	);
};

export default PokemonInformation;
