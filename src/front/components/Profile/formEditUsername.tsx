'use client';
import React, { useEffect, useState } from 'react';
import { PencilLine, SaveAll } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateUserAction } from '../../actions/user.actions';
import { UserUpdate } from '../../../interfaces/user/userUpdate';
import { UserEntity } from '../../../interfaces/user/userEntity';

interface FormEditUsernameProps {
	userDetails: UserEntity;
	initialUsername: string;
	onUsernameUpdate: (newUsername: string) => void;
	setOpenForm: (
		openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null
	) => void;
	openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null;
}

const userSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Name is required' })
		.refine(username => /^[a-zA-Z0-9_]{3,16}$/.test(username), {
			message:
				'Username must be between 3 and 16 characters long and contain only letters, numbers, and underscores'
		})
});

const FormEditUsername = ({
	userDetails,
	initialUsername,
	onUsernameUpdate,
	setOpenForm,
	openForm
}: FormEditUsernameProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newUsername, setNewUsername] = useState(initialUsername);
	const [errors, setErrors] = useState<{ username: string }>({ username: '' });
	const [isSaving, setIsSaving] = useState(false);

	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null;

	// Enable editing
	const handleEdit = () => {
		setIsEditing(true);
		setOpenForm('username');
	};

	// Handle Escape key press to cancel
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isEditing) {
				setIsEditing(false);
				setOpenForm(null);
				handleCancel();
			}
		};

		if (isEditing) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isEditing]);

	// Confirm username change
	const handleConfirm = () => {
		if (!accessToken) {
			toast.error('No access token found');
			return;
		}
		if (newUsername === initialUsername) {
			toast.error('No changes made to the username');
			return;
		}

		const userToUpdate: UserUpdate = {
			id: userDetails.id,
			username: newUsername
		};

		try {
			userSchema.parse({ username: newUsername });
			setIsSaving(true); // Start saving process
			toast.promise(updateUserAction(userToUpdate, accessToken), {
				loading: 'Updating username...',
				success: () => {
					onUsernameUpdate(newUsername);
					setIsSaving(false); // End saving process
					setIsEditing(false); // Close the edit mode only after success
					setOpenForm(null);
					return 'Username updated successfully';
				},
				error: error => {
					setIsSaving(false); // End saving process on error
					return error.message;
				}
			});
		} catch (error) {
			setIsSaving(false); // End saving process on validation error
			if (error instanceof z.ZodError) {
				setErrors({
					username:
						error.errors.find(e => e.path[0] === 'username')?.message ||
						''
				});
			}
		}
	};

	// Handle change of input and clear errors
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUsername(e.target.value);
		setErrors({ username: '' });
	};

	// Cancel editing and revert changes
	const handleCancel = () => {
		setNewUsername(initialUsername);
		setErrors({ username: '' });
		setIsEditing(false);
		setOpenForm(null);
	};

	// Handle onBlur to confirm changes when the input loses focus
	const handleBlur = () => {
		if (!isSaving && newUsername !== initialUsername) {
			handleConfirm();
		} else if (!isSaving) {
			setIsEditing(false);
			setOpenForm(null);
		}
	};

	// Surveiller les touches Enter et Escape
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleConfirm();
		}
	};

	return (
		<div className="username-container">
			<div className="form-edit-username">
				<h2>Username: </h2>
				{errors.username && (
					<div className={'error'}>{errors.username}</div>
				)}
				{isEditing ? (
					// Show input field when editing
					<div className="username-show">
						<div className="input-container">
							<input
								type="text"
								value={newUsername}
								onChange={handleChange}
								onBlur={handleBlur}
								onKeyDown={handleKeyDown}
							/>
						</div>
						<div className="btn-confirm-container">
							<button
								onClick={() => {
									setIsSaving(true); // Set saving state when clicking Save
									handleConfirm();
								}}
								className="btn-confirm"
							>
								<SaveAll width={20} height={20} />
							</button>
						</div>
					</div>
				) : (
					// Show username and edit button when not editing
					<div className="username-show">
						<h1>{initialUsername}</h1>
						<div className="btn-edit-container">
							<button
								onClick={handleEdit}
								className="user-update"
								disabled={openForm !== null}
							>
								<PencilLine />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FormEditUsername;
