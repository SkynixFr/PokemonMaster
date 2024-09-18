'use client';

import React, { useEffect, useState } from 'react';

// Components
import Battle from '../../../app/(user)/battle/page';

//Classes
import BattleClass from '../../../back/classes/battle';
import CustomImage from '../customImage';

const BattleLoader = () => {
	const [battle, setBattle] = useState<BattleClass>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const battle = JSON.parse(localStorage.getItem('battle'));
		setBattle(battle);
		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
	}, []);

	return (
		<div>
			{isLoading ? (
				<div className={'battle-loader__container'}>
					<div className={'battle-loader__background'}>
						<CustomImage
							src={'/images/backgrounds/battleloader.webp'}
							alt={'battleloader background'}
							fill
						/>
						<div className={'battle-loader__filter'}></div>
					</div>

					<div className={'battle-loader__content'}>
						<div className={'battle-loader__user__content opponent'}>
							<div className={'user__avatar'}>
								<CustomImage
									src={battle?.opponentTeam.avatar.sprite}
									alt={`avatar-player-${battle?.opponentTeam.avatar.name}`}
									width={100}
									height={200}
								/>
							</div>
							<div className={'user__name'}>
								{battle?.opponentTeam.name}
							</div>
							<div className={'pokemons__container'}>
								{battle?.opponentTeam.pokemons.map((pokemon, index) => (
									<div
										key={index}
										className={'pokemon__container'}
										style={{
											animationName: 'fadeInToLeft',
											animationDuration: `${1 + index * 0.25}s`
										}}
									>
										<CustomImage
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.pokedexId}.gif`}
											alt={pokemon.name}
											width={60}
											height={60}
											unoptimized={true}
										/>
									</div>
								))}
							</div>
						</div>
						<div className={'battle__vs'}>
							<CustomImage
								src={'/images/other/vs.png'}
								alt={'VS logo'}
								width={200}
								height={200}
							/>
						</div>

						<div className={'battle-loader__user__content player'}>
							<div className={'user__avatar'}>
								<CustomImage
									src={battle?.playerTeam.avatar.sprite}
									alt={`avatar-player-${battle?.playerTeam.avatar.name}`}
									width={100}
									height={200}
								/>
							</div>
							<div className={'user__name'}>
								{battle?.playerTeam.name}
							</div>
							<div className={'pokemons__container'}>
								{battle?.playerTeam.pokemons.map((pokemon, index) => (
									<div
										key={index}
										className={'pokemon__container'}
										style={{
											animationName: 'fadeInToRight',
											animationDuration: `${1 + index * 0.25}s`
										}}
									>
										<CustomImage
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.pokedexId}.gif`}
											alt={pokemon.name}
											width={60}
											height={60}
											unoptimized={true}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className={'battle-loader__bottom'}>
						<h2>Battle is loading</h2>
						<CustomImage
							src={'/images/other/pokeball-loader.gif'}
							alt={'pokeball loader'}
							width={40}
							height={40}
						/>
					</div>
				</div>
			) : (
				<Battle battle={battle} />
			)}
		</div>
	);
};

export default BattleLoader;
