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
	return (
		<div className="delete-account-modal">
			<div className="delete-account-modal-content">
				<button
					className="btn-close-modal"
					onClick={() => setIsDeleteModalOpen(false)}
				>
					<X />
				</button>
				<h2>Delete Account</h2>
				<p>
					Are you sure you want to delete your account? This action is
					irreversible.
				</p>
				<button
					className="btn-delete-account"
					onClick={() => {
						setIsDeleteModalOpen(false);
						deleteUser();
					}}
				>
					Delete Account
				</button>
				<button className="btn-cancel" onClick={() => handleCancel()}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default FormDeleteAccount;
