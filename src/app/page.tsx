import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<h1>Pokemon Master</h1>
			<Link href={'/dashboard'}>Secret link</Link>
		</div>
	);
};

export default Home;
