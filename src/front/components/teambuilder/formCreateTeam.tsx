import { FormEventHandler, useEffect, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Components
import Avatar from './avatar';
import CustomImage from '../customImage';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
interface FormCreateTeamProps {
	avatars: AvatarEntity[];
	setOpenForm: (openForm: boolean) => void;
	setSelectedTeam: (team: TeamEntity) => void;
	setCurrentTeams: (teams: TeamEntity[]) => void;
}

// Icons
import { X } from 'lucide-react';

// Actions
import { createTeam } from '../../actions/team.actions';
import { TeamEntity } from '../../../interfaces/team/teamEntity';

const teamSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(20, { message: 'Name is too long' })
		.regex(new RegExp('^[\\w -]+$'), {
			message:
				'Name is invalid. Only letters, numbers, spaces and hyphens are allowed.'
		})
});

const formCreateTeam = ({
	avatars,
	setOpenForm,
	setSelectedTeam
}: FormCreateTeamProps) => {
	const router = useRouter();
	const [avatarSelected, setAvatarSelected] = useState<AvatarEntity>(
		avatars[0]
	);
	const [errors, setErrors] = useState<{
		name: string;
	}>({
		name: ''
	});

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenForm(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpenForm]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		const form = event.currentTarget;
		try {
			teamSchema.parse({
				name: form.team.value
			});
			const formData = new FormData(form);

			toast.promise(createTeam(formData, avatarSelected.id), {
				loading: 'Creating team...',
				success: response => {
					if (response.status) {
						throw new Error(response.message);
					}
					form.reset();
					setSelectedTeam(response);
					router.refresh();
					setOpenForm(false);
					return `${response.name} created successfully!`;
				},
				error: error => {
					return error.message;
				}
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors({
					name: error.errors.find(e => e.path[0] === 'name')?.message ?? ''
				});
			}
		}
	};

	const handleChange = () => {
		setErrors({
			name: ''
		});
	};

	return (
		<div className={'form-create-team'}>
			<div className={'bg-form'}>
				<CustomImage
					src="/images/other/bg-form-team.png"
					alt="Background form team"
					fill={true}
					sizes="(max-width: 640px) 150px, 344px"
				/>
			</div>
			<h2>New team</h2>
			<button className={'close-btn'} onClick={() => setOpenForm(false)}>
				<X width={30} height={30} />
			</button>
			<form className={'create-team'} onSubmit={handleSubmit}>
				<input
					type="text"
					name="team"
					id="team"
					placeholder="Team name"
					onChange={handleChange}
				/>
				{errors.name && <div className={'error'}>{errors.name}</div>}
				{avatars && avatars.length > 0 ? (
					<div className={'avatars-container'}>
						<h3>Choose your avatar</h3>
						<div className={'avatars-list'}>
							{avatars.map(avatar => (
								<Avatar
									avatar={avatar}
									key={avatar.id}
									avatarSelected={avatarSelected}
									setAvatarSelected={setAvatarSelected}
								/>
							))}
						</div>
					</div>
				) : (
					<div>No avatars found</div>
				)}
				<button className={'btn-create-team btn-primary'}>Create</button>
			</form>
		</div>
	);
};

export default formCreateTeam;
