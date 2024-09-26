// Import needed libs
import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEventHandler } from 'react';
import { toast } from 'sonner';
import { set, z } from 'zod';
// Actions
import { updateUserAction } from '../../actions/user.actions';
// Interfaces
import { UserEntity } from '../../../interfaces/user/userEntity';
import { UserUpdate } from '../../../interfaces/user/userUpdate';
import { X } from 'lucide-react';

interface FormEditPasswordProps {
	userDetails: UserEntity;
	setOpenPasswordModal: (isOpen: boolean) => void;
	setOpenForm: (
		openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null
	) => void;
	openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null;
}

const userSchema = z
	.object({
		newpassword: z.string().refine(
			newpassword => {
				const isValid = newpassword.match(
					'^(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{8,}$'
				);
				return isValid;
			},
			{
				message:
					'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and must be at least 8 characters long'
			}
		),
		confirmPassword: z.string()
	})
	.refine(data => data.newpassword === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

const FormEditPassword = ({
	userDetails,
	setOpenPasswordModal,
	openForm,
	setOpenForm
}: FormEditPasswordProps) => {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState<{
		newpassword: string;
		confirmPassword: string;
	}>({
		newpassword: '',
		confirmPassword: ''
	});
	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null;
	const handleSaveClick = () => {
		if (!accessToken) {
			toast.error('No access token found');
			return;
		}
		const userToUpdate: UserUpdate = {
			id: userDetails.id,
			password: newPassword
		};
		try {
			userSchema.parse({
				newpassword: newPassword,
				confirmPassword: confirmPassword
			});
			toast.promise(updateUserAction(userToUpdate, accessToken), {
				loading: 'Updating your password...',
				success: 'Password updated successfully',
				error: error => {
					return error.message;
				}
			});
			setOpenPasswordModal(false);
			setOpenForm(null);
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors({
					newpassword:
						error.errors.find(e => e.path[0] === 'newpassword')
							?.message ?? '',
					confirmPassword:
						error.errors.find(e => e.path[0] === 'confirmPassword')
							?.message ?? ''
				});
			}
		}
	};
	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
		setErrors({ newpassword: '', confirmPassword: '' });
	};
	const handleChangeConfirmPassword = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value);
		setErrors({ newpassword: '', confirmPassword: '' });
	};
	const handleCancel = () => {
		setNewPassword('');
		setConfirmPassword('');
		setErrors({ newpassword: '', confirmPassword: '' });
		setOpenPasswordModal(false);
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
	// Surveiller les touches Enter et Escape
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSaveClick();
		}
	};
	return (
		<div className="profile-modal">
			<div className="profile-modal-content">
				<h1>Update your Password</h1>

				<div className="input-group">
					<label className="input-label">New password</label>
					{errors.newpassword && <span>{errors.newpassword}</span>}
					<input
						type="password"
						className="input-field"
						value={newPassword}
						onChange={handleChangePassword}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="input-group">
					<label className="input-label">Confirm password</label>
					{errors.confirmPassword && <span>{errors.confirmPassword}</span>}
					<input
						type="password"
						className="input-field"
						value={confirmPassword}
						onChange={handleChangeConfirmPassword}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="profile-modal-buttons">
					<button
						className="profile-modal-button btn-secondary"
						onClick={handleSaveClick}
					>
						Save
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

export default FormEditPassword;

{
	/* <div className="profile-modal">
	<div className="profile-modal-content">
		<h1>Update your Password</h1>

		<div className="input-group">
			<label className="input-label">New password</label>
			<input
				type="password"
				className="input-field"
				value={newPassword}
				onChange={e => setNewPassword(e.target.value)}
				placeholder="New password"
			/>
			{errors.newpassword && <span>{errors.newpassword}</span>}
		</div>
		<div className="input-group">
			<label className="input-label">Confirm your new password</label>
			<input
				type="password"
				className="input-field"
				value={confirmPassword}
				onChange={e => setConfirmPassword(e.target.value)}
				placeholder="Confirm your new password"
			/>
			{errors.confirmPassword && <span>{errors.confirmPassword}</span>}
		</div>
		<div className="profile-modal-buttons">
			<button
				className="profile-modal-button btn-primary"
				onClick={handleSaveClick}
			>
				Save
			</button>
			<button
				className="profile-modal-button"
				onClick={() => handleCancel()}
			>
				Cancel
			</button>
		</div>
		<button className={'close-btn'} onClick={() => handleCancel()}>
			<X width={30} height={30} />
		</button>
	</div>
</div>; */
}
