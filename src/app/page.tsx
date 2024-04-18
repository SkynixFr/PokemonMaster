import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<h1>Pokemon Master</h1>
			<ul>
				<li>
					<Link href={'/dasboard'}>Admin Dasboard</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
