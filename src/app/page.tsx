import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<h1>Pokemon Master</h1>
			<ul>
				<li>
					<Link href={'/dasboard'}>Admin Dasboard</Link>
				</li>
				<li>
					<Link href={'/teambuilder'}>Team builder</Link>
				</li>
				<li>
					<Link href={'/login'}>Login</Link>
				</li>
				<li>
					<Link href={'/register'}>Register</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
