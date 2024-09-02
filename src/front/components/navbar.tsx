'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CustomImage from './customImage';

const Navbar = () => {
	const router = useRouter();
	const pathname = usePathname();
	return pathname.includes('/pokemonbuilder') ||
		pathname.includes('/battle') ? null : (
		<nav className={'navbar'}>
			<div className={'navbar-container'}>
				<div className={'navbar-logo'}>
					<Link href={'/'}>
						<CustomImage
							alt={'Logo'}
							src={'/images/compressed/other/logo.png'}
							width={60}
							height={60}
						/>
					</Link>
				</div>

				<div className={'navbar-links-container'}>
					<ul className={'navbar-links'}>
						<li>
							<Link
								href={'/'}
								className={`link ${pathname === '/' ? 'active' : ''} `}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href={'/teambuilder'}
								className={`link ${pathname === '/teambuilder' ? 'active' : ''} `}
							>
								Team Builder
							</Link>
						</li>
					</ul>
					<div className={'navbar-profil'}>
						<button
							className={'btn-primary'}
							onClick={() => router.replace('/signin')}
						>
							Sign in
						</button>
						<button
							className={'btn-secondary'}
							onClick={() => router.replace('/login')}
						>
							Log in
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
