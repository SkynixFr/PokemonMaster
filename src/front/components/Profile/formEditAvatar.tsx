// Import needed libs
import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEventHandler } from 'react';
import { toast } from 'sonner';
// Components
import Avatar from '../teambuilder/avatar';
// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
import { UserEntity } from '../../../interfaces/user/userEntity';
import { UserUpdate } from '../../../interfaces/user/userUpdate';
// Icons
import { X } from 'lucide-react';
// Actions
import { updateUserAction } from '../../actions/user.actions';

interface FormAvatarProps {
	userDetails: UserEntity;
	avatars: AvatarEntity[];
	setOpenForm: (
		openForm: 'avatar' | 'username' | 'email' | 'password' | null
	) => void;
	onAvatarUpdate: (newAvatar: AvatarEntity) => void;
}

const FormEditAvatar = ({
	userDetails,
	avatars,
	setOpenForm,
	onAvatarUpdate
}: FormAvatarProps) => {
	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null; // Ensuring it only runs on the client-side
	const router = useRouter();
	const [avatarSelected, setAvatarSelected] = useState<AvatarEntity>(
		avatars[0]
	);
	const [errors, setErrors] = useState<{ name: string }>({ name: '' });

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenForm(null);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpenForm]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();

		if (!accessToken) {
			toast.error('No access token found');
			return;
		}

		const userToUpdate: UserUpdate = {
			id: userDetails.id,
			avatarId: avatarSelected.id
		};

		try {
			const response = await updateUserAction(userToUpdate, accessToken);
			if (response.status) {
				throw new Error(response.message);
			}
			onAvatarUpdate(avatarSelected);
			toast.success(`${response.username} avatar updated successfully!`);
			router.refresh(); // Refresh the router to update the UI
			setOpenForm(null); // Close the form
		} catch (error: any) {
			toast.error(error.message || 'An error occurred');
			console.error('Error in FormEditAvatar:', error);
		}
	};

	return (
		<div className="create-team-modal">
			<div className={'form-create-team'}>
				<button className="close-btn" onClick={() => setOpenForm(null)}>
					<X width={30} height={30} />
				</button>
				<form className="edit-avatar" onSubmit={handleSubmit}>
					{errors.name && <div className="error">{errors.name}</div>}
					{avatars && avatars.length > 0 ? (
						<div className="avatars-container">
							<h3>Choose your avatar</h3>
							<div className="avatars-list">
								{avatars.map(avatar => (
									<Avatar
										avatar={avatar}
										key={avatar.id}
										avatarSelected={avatarSelected}
										setAvatarSelected={setAvatarSelected}
									/>
								))}
							</div>
							<div className="btn-create-team-container-modal">
								<button
									type="submit"
									className="btn-create-team btn-primary"
								>
									Edit avatar
								</button>
							</div>
						</div>
					) : (
						<div>No avatars found</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default FormEditAvatar;
