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
			message: 'Invalid Username'
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
				success: response => {
					if (response.status) {
						throw new Error(response.message);
					}
					onUsernameUpdate(newUsername);
					setIsEditing(false);
					setOpenForm(null);
					setIsSaving(false);
					return 'Username updated successfully';
				},
				error: error => {
					setIsSaving(false); // End saving process on error
					return error.message;
				}
			});
		} catch (error) {
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

	// Handle onBlur mais ne pas annuler si le bouton Save est cliqué
	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!isSaving) {
			handleCancel();
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
				<h2>Username :</h2>

				{isEditing ? (
					// Show input field when editing
					<div className="username-show">
						<div className="input-container">
							{errors.username && (
								<div className={'error'}>{errors.username}</div>
							)}
							<input
								type="text"
								value={newUsername}
								onChange={handleChange}
								onBlur={handleBlur}
								onKeyDown={handleKeyDown}
								autoFocus
							/>
						</div>
						<div className="btn-confirm-container">
							<button
								onClick={handleConfirm}
								onMouseDown={() => setIsSaving(true)} // Pour capturer le clic de sauvegarde
								onMouseUp={() => setIsSaving(false)} // Réinitialiser après le clic
								className="btn-confirm"
							>
								<SaveAll width={20} height={20} />
							</button>
						</div>
					</div>
				) : (
					// Show username and edit button when not editing
					<div className="username-show">
						<span className={'username-show-text'}>
							{initialUsername}
						</span>
						<div className="username-edit-container">
							<button
								onClick={handleEdit}
								className="user-update"
								disabled={openForm !== null}
							>
								<PencilLine width={20} height={20} />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FormEditUsername;
