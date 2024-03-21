import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<h1>Hello World</h1>
			<ul>
				<li>
					<Link href={`/teambuilder`}>Team builder</Link>
				</li>
				<li>
					<Link href={`/battle`}>Battle</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
