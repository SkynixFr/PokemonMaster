'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isConnected } from './authProvider/authProvider';
import { MouseEventHandler } from 'react';
import { toast } from 'sonner';
const Navbar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const logout: MouseEventHandler<HTMLButtonElement> = async event => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		toast('Logging out...');
		toast.success('User log out successfully!');
		router.push('/');
		router.refresh();
	};
	return (
		<nav className={'navbar'}>
			<div className={'navbar-logo'}>
				<Link href={'/'}>
					<Image
						alt={'Logo'}
						src={'/images/compressed/other/logo.png'}
						width={65}
						height={65}
					/>
				</Link>
			</div>
			<ul className={'navbar-links'}>
				<li>
					<Link
						href={'/teambuilder'}
						className={`link ${pathname === '/teambuilder' ? 'active' : ''} `}
					>
						Team Builder
					</Link>
				</li>
				<li>
					<Link
						href={'/rooms'}
						className={`link ${pathname === '/rooms' ? 'active' : ''} `}
					>
						Rooms
					</Link>
				</li>
			</ul>
			{isConnected() ? (
				<div className={'navbar-profil'}>
					<button
						className={'btn-primary'}
						onClick={() => router.replace('/profile')}
					>
						Profile
					</button>
					<button className={'btn-secondary'} onClick={logout}>
						Log out
					</button>
				</div>
			) : (
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
			)}
		</nav>
	);
};

export default Navbar;
