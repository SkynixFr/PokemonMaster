'use client';

import React, { use } from 'react';
import { Router, useRouter } from 'next/router';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import CustomImage from '../../../front/components/customImage';
const Unauthorized = () => {
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
				<p>Sorry, you do not have permission to access this page.</p>
			</div>
		</div>
	);
};

export default Unauthorized;
