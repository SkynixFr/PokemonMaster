'use client';
import React, { useEffect, useState } from 'react';
import { PencilLine, Check, X, Mail } from 'lucide-react';

// Import needed libs
import { toast } from 'sonner';
import { set, z } from 'zod';

// Actions
import { updateUserAction } from '../../actions/user.actions';

// Interfaces
import { UserUpdate } from '../../../interfaces/user/userUpdate';
import { UserEntity } from '../../../interfaces/user/userEntity';
interface FormEditEmailProps {
	userDetails: UserEntity;
	initialEmail: string;
	onEmailUpdate: (newEmail: string) => void;
	setOpenForm: (
		openForm: 'avatar' | 'username' | 'email' | 'password' | null
	) => void;
	openForm: 'avatar' | 'username' | 'email' | 'password' | null;
}
const userSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' })
});

function forEditEmail(email: string): string {
	const [Email, domain] = email.split('@');
	const maskedEmail = Email.slice(0, 3).padEnd(Email.length, '*');
	return `${maskedEmail}@${domain}`;
}

const formEditEmail = ({
	userDetails,
	initialEmail,
	onEmailUpdate,
	setOpenForm,
	openForm
}: FormEditEmailProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newEmail, setNewEmail] = useState(initialEmail);
	const [errors, setErrors] = useState<{ email: string }>({
		email: ''
	});
	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null;

	// Handler to enable editing
	const handleEdit = () => {
		setIsEditing(true);
		setOpenForm('email');
	};
	// Confirm the Email change
	const handleConfirm = () => {
		if (!accessToken) {
			toast.error('No access token found');
			return;
		}
		if (newEmail === initialEmail) {
			toast.error('No changes made to the Email');
			return;
		}
		const userToUpdate: UserUpdate = {
			id: userDetails.id,
			email: newEmail
		};
		try {
			userSchema.parse({ email: newEmail });
			toast.promise(updateUserAction(userToUpdate, accessToken), {
				loading: 'Updating Email...',
				success: () => {
					onEmailUpdate(newEmail);
					setIsEditing(false);
					setOpenForm(null);
					return 'Email updated';
				},
				error: error => {
					return error.message;
				}
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors({
					email:
						error.errors.find(e => e.path[0] === 'email')?.message ?? ''
				});
			}
		}
	};
	// Handle change of Email input
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewEmail(e.target.value);
		setErrors({ email: '' });
	};

	// Cancel and revert changes
	const handleCancel = () => {
		setNewEmail(initialEmail);
		setErrors({ email: '' });
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
		<div className="form-edit-email">
			<Mail size={24} />
			{isEditing ? (
				<div>
					{errors.email && <div className={'error'}>{errors.email}</div>}
					<input
						type="text"
						value={newEmail}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
					/>
					<button onClick={handleConfirm} className="btn-confirm-Email">
						<Check />
					</button>
					<button onClick={handleCancel} className="btn-cancel-Email">
						<X />
					</button>
				</div>
			) : (
				// Show Email and edit button when not editing
				<div>
					<h1>{forEditEmail(initialEmail)}</h1>
					<button
						onClick={handleEdit}
						className="user-update"
						disabled={openForm !== null}
					>
						<PencilLine />
					</button>
				</div>
			)}
		</div>
	);
};

export default formEditEmail;
