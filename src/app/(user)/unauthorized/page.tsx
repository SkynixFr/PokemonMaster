'use client';

import React, { use, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import CustomImage from '../../../front/components/customImage';
const Unauthorized = () => {
	const router = useRouter();
	useEffect(() => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		router.refresh();
	}, []);

	return (
		<div className="form-container">
			<div className="Go-Back-container">
				<MoveLeft />
				<Link href={'/'} className="back-link">
					Go Back
				</Link>
			</div>
			<div className={'form-background'}>
				<CustomImage
					src={`/images/backgrounds/pokemonMaster-bg-login.jpg`}
					alt={'background login'}
					width={10000}
					height={10000}
				/>
			</div>
			<div className="unauthorized-page">
				<div className="form-logo">
					<CustomImage
						src={`/images/compressed/other/logo.png`}
						alt={'pokemonMaster logo'}
						width={150}
						height={150}
					/>
				</div>

				<h1>Error 401 - Unauthorized</h1>
				<span>Sorry, you do not have permission to access this page.</span>
				<div className="form-footer">
					<Link href={'/home'} className="home-link">
						Click here to go back to the home page
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Unauthorized;
