'use client';
import Link from 'next/link';
import CustomImage from '../front/components/custom/customImage';
const Home = () => {
	return (
		<div>
			<CustomImage
				src={'/images/compressed/other/logo.png'}
				alt={'Pokemon Master logo'}
				width={300}
				height={300}
				objectFit={'contain'}
				priority={true}
			/>
			<h1>Pokemon Master</h1>
			<ul>
				<li>
					<Link href={'/teambuilder'}>Team builder</Link>
				</li>
				<li>
					<Link href={'/rooms'}>Rooms</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
