import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { set } from 'zod';

interface GobackModalProps {
	setOpenModal: (value: boolean) => void;
}

const gobackModal = ({ setOpenModal }: GobackModalProps) => {
	const router = useRouter();
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenModal(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpenModal]);
	return (
		<div className={'profile-modal'}>
			<div className={'profile-modal-content'}>
				<h1>Are you sure you want to leave ? </h1>
				<span>Any staged changes won't be save</span>
				<div className={'profile-modal-buttons'}>
					<button
						className={'profile-modal-button btn-secondary '}
						onClick={() => {
							router.push('/');
						}}
					>
						Yes
					</button>
					<button
						className={'profile-modal-button btn-primary'}
						onClick={() => setOpenModal(false)}
					>
						No
					</button>
				</div>
				<button className={'close-btn'} onClick={() => setOpenModal(false)}>
					<X width={30} height={30} />
				</button>
			</div>
		</div>
	);
};

export default gobackModal;
