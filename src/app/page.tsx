'use client';
import CustomImage from '../front/components/customImage';
import React from 'react';
import { useRouter } from 'next/navigation';
import { isConnected } from '../front/components/authProvider/authProvider';

const Home = () => {
	const router = useRouter();
	const handleTryBattle = () => {
		if (isConnected()) {
			router.push('/teambuilder');
		} else {
			router.push('/signin');
		}
	};

	return (
		<div className={'hero-container'}>
			<div className={'hero-container__background'}>
				<div className={'hero-container__filter'}></div>
				<CustomImage
					src={'/images/backgrounds/hero-section.png'}
					alt={'Hero container background'}
					fill
				/>
			</div>
			<div className={'hero-container__infos'}>
				<span>Hello Trainer !</span>
				<h1>Pokemon Master</h1>
				<div className={'hero-container__infos__text'}>
					<p>
						Gear up to take on top trainers from around the globe in
						online battles! Are you ready to showcase your skills and
						become the ultimate champion? Join us now and embark on your
						journey to glory!
					</p>
					<button onClick={() => handleTryBattle()}>Try a battle</button>
				</div>
			</div>
			<div>
				<CustomImage
					src={'/images/other/logo.png'}
					alt={'PokemonMaster Logo'}
					width={500}
					height={500}
				/>
			</div>
		</div>
	);
};

export default Home;
