'use client';

import { useState } from 'react';
import IPokemon from '../../../interfaces/IPokemon';
import CustomImage from '../custom/customImage';

interface PokemonInformationProps {
	pokemon: IPokemon;
}

const PokemonInformation = ({ pokemon }: PokemonInformationProps) => {
	console.log(pokemon.types);
	return (
		<div>
			<h1>
				#{pokemon.id} : {pokemon.name}
			</h1>
			<CustomImage
				src={pokemon.sprite}
				alt={pokemon.name}
				priority={true}
				width={200}
				height={200}
				objectFit={'contain'}
			/>
			<div>
				<h2>Types:</h2>
				<ul>
					{pokemon.types.map(type => (
						<li key={type.name}>{type.name}</li>
					))}
				</ul>
				<p>Level : {pokemon.level}</p>
				<p>Gender : {pokemon.gender}</p>
				<p>Item : {pokemon.item.name}</p>
				<p>Shiny : {pokemon.isShiny ? 'Yes' : 'No'}</p>
				<h2>Item</h2>
				<span>
					{pokemon.item.name} : {pokemon.item.description}
				</span>
				<h2>Nature</h2>
				<p> {pokemon.nature}</p>
				<h2>Ability</h2>
				<p>{pokemon.ability.name}</p>
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
			</div>
		</div>
	);
};

export default PokemonInformation;
