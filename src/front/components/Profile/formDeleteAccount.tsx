// Import needed libs
import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEventHandler } from 'react';
import { toast } from 'sonner';
// Components
import Avatar from '../teambuilder/avatar';
// Interfaces
import { UserEntity } from '../../../interfaces/user/userEntity';
import { UserUpdate } from '../../../interfaces/user/userUpdate';
// Icons
import { X } from 'lucide-react';
// Actions
import { deleteUserAction } from '../../actions/user.actions';
import { firstLetterMaj } from '../../utils/formatString';

interface FormDeleteAccountProps {
	userDetails: UserEntity;
	setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
	setOpenForm: (
		openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null
	) => void;
	openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null;
}

const FormDeleteAccount = ({
	userDetails,
	setIsDeleteModalOpen,
	setOpenForm,
	openForm
}: FormDeleteAccountProps) => {
	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null; // Ensuring it only runs on the client-side

	const router = useRouter();

	const deleteUser = async () => {
		if (!accessToken) {
			toast.error('No access token found');
			return;
		}

		try {
			toast.promise(deleteUserAction(userDetails.id, accessToken), {
				loading: 'Deleting account...',
				success: () => {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					router.push('/');
					return 'Account deleted';
				},
				error: error => {
					return error.message;
				}
			});
		} catch (error) {
			toast.error(error.message);
		}
	};
	const handleCancel = () => {
		setIsDeleteModalOpen(false);
		setOpenForm(null);
	};
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleCancel();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleCancel]);
	return (
		<div className="profile-modal">
			<div className="profile-modal-content">
				<h1>
					Delete Account{' '}
					<span>{firstLetterMaj(userDetails.username)}</span>
				</h1>
				<span>
					Are you sure you want to delete your account? This action is
					irreversible.
				</span>
				<div className="profile-modal-buttons">
					<button
						className="profile-modal-button btn-secondary"
						onClick={() => {
							setIsDeleteModalOpen(false);
							deleteUser();
						}}
					>
						Delete Account
					</button>
					<button
						className="profile-modal-button btn-primary"
						onClick={() => handleCancel()}
					>
						Cancel
					</button>
				</div>
				<button className={'close-btn'} onClick={() => handleCancel()}>
					<X width={30} height={30} />
				</button>
			</div>
		</div>
	);
};

export default FormDeleteAccount;
