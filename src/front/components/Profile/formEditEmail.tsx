import React, { useEffect, useState } from 'react';
import { PencilLine, Mail, SaveAll } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateUserAction } from '../../actions/user.actions';
import { UserUpdate } from '../../../interfaces/user/userUpdate';
import { UserEntity } from '../../../interfaces/user/userEntity';

interface FormEditEmailProps {
	userDetails: UserEntity;
	initialEmail: string;
	onEmailUpdate: (newEmail: string) => void;
	setOpenForm: (
		openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null
	) => void;
	openForm: 'avatar' | 'username' | 'email' | 'password' | 'delete' | null;
}

const userSchema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.max(30, { message: 'Email must be 30 characters or less' })
});

function forEditEmail(email: string): string {
	const [Email, domain] = email.split('@');
	const maskedEmail = Email.slice(0, 3).padEnd(Email.length, '*');
	return `${maskedEmail}@${domain}`;
}

const FormEditEmail = ({
	userDetails,
	initialEmail,
	onEmailUpdate,
	setOpenForm,
	openForm
}: FormEditEmailProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newEmail, setNewEmail] = useState(initialEmail);
	const [errors, setErrors] = useState<{ email: string }>({ email: '' });
	const [isSaving, setIsSaving] = useState(false); // Variable pour détecter si on sauvegarde

	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null;

	const handleEdit = () => {
		setIsEditing(true);
		setOpenForm('email');
	};

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
			setIsSaving(true);
			toast.promise(updateUserAction(userToUpdate, accessToken), {
				loading: 'Updating Email...',
				success: response => {
					if (response.status) {
						throw new Error(response.message);
					}
					onEmailUpdate(newEmail);
					setIsEditing(false);
					setOpenForm(null);
					setIsSaving(false);
					return 'Email updated';
				},
				error: error => {
					setIsSaving(false);
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewEmail(e.target.value);
		setErrors({ email: '' });
	};

	// Annuler les modifications
	const handleCancel = () => {
		setNewEmail(initialEmail);
		setErrors({ email: '' });
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

	return (
		<div className="email-container">
			<div className="form-edit-email">
				<h2>Email :</h2>

				{isEditing ? (
					<div className="email-show">
						<div className="input-container">
							{errors.email && (
								<div className={'error'}>{errors.email}</div>
							)}
							<input
								type="text"
								value={newEmail}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								onBlur={handleBlur}
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
					<div className="email-show">
						<span className={'email-show-text'}>
							<Mail width={25} height={25} />
							{forEditEmail(initialEmail)}
						</span>
						<div className="email-edit-container">
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

export default FormEditEmail;
