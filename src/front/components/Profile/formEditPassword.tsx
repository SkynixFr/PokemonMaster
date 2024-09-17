// Import needed libs
import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEventHandler } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
// Actions
import { updateUserAction } from '../../actions/user.actions';
// Interfaces
import { UserEntity } from '../../../interfaces/user/userEntity';
import { UserUpdate } from '../../../interfaces/user/userUpdate';

interface FormEditPasswordProps {
	userDetails: UserEntity;
	setOpenPasswordModal: (isOpen: boolean) => void;
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
					'Password must contain at least one uppercase letter, one lowercase letter, and one number'
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
	setOpenPasswordModal
}: FormEditPasswordProps) => {
	const [oldPassword, setOldPassword] = useState('');
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
		console.log(userToUpdate);
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
	const handleChange = () => {
		setErrors({ newpassword: '', confirmPassword: '' });
	};

	return (
		<div className="modal">
			<div className="modal-overlay">
				<div className="modal-content">
					<h2>Update your Password</h2>

					<div className="form-group">
						<label>New password</label>
						<input
							type="password"
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							placeholder="New password"
						/>
						{errors.newpassword && <span>{errors.newpassword}</span>}
					</div>
					<div className="form-group">
						<label>Confirm your new password</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							placeholder="Confirm your new password"
						/>
						{errors.confirmPassword && (
							<span>{errors.confirmPassword}</span>
						)}
					</div>
					<div className="modal-actions">
						<button onClick={handleSaveClick}>Save</button>
						<button onClick={() => setOpenPasswordModal(false)}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormEditPassword;
