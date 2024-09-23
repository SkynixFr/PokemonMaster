'use client';
import React, { useEffect, useState } from 'react';
import { PencilLine, Check, X, SaveAll } from 'lucide-react';

// Import needed libs
import { toast } from 'sonner';
import { set, z } from 'zod';

// Actions
import { updateUserAction } from '../../actions/user.actions';

// Interfaces
import { UserUpdate } from '../../../interfaces/user/userUpdate';
import { UserEntity } from '../../../interfaces/user/userEntity';

// Interface
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
	const [errors, setErrors] = useState<{ username: string }>({
		username: ''
	});

	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null;

	// Handler to enable editing
	const handleEdit = () => {
		setIsEditing(true);
		setOpenForm('username');
	};

	// Handle Escape key press
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isEditing) {
				setIsEditing(false); // Close only if editing
				setOpenForm(null);
				handleCancel();
			}
		};

		// Add event listener only when in edit mode
		if (isEditing) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			// Clean up the event listener when not editing
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isEditing]);

	// Confirm the username change
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
			toast.promise(updateUserAction(userToUpdate, accessToken), {
				loading: 'Updating username...',
				success: () => {
					onUsernameUpdate(newUsername);
					setIsEditing(false);
					setOpenForm(null);
					return 'Username updated';
				},
				error: error => {
					return error.message;
				}
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors({
					username:
						error.errors.find(e => e.path[0] === 'username')?.message ??
						''
				});
			}
		}
	};

	// Handle change of username input
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUsername(e.target.value);
		setErrors({ username: '' });
	};

	// Cancel and revert changes
	const handleCancel = () => {
		setNewUsername(initialUsername);
		setErrors({ username: '' });
		setIsEditing(false);
		setOpenForm(null);
	};

	// Handle Enter key press to confirm changes
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleConfirm();
		}
	};

	return (
		<div className="username-container">
			<div className="form-edit-username">
				<h2>Username : </h2>
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
								onKeyDown={handleKeyDown}
							/>
						</div>
						<div className="btn-confirm-container">
							<button onClick={handleConfirm} className="btn-confirm">
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
