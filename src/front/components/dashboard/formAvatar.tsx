'use client';

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';

// Actions
import { addAvatar } from '../../actions/avatar.actions';

const avatarSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	region: z
		.string()
		.min(1, { message: 'Region is required' })
		.refine(region =>
			[
				'Kanto',
				'Johto',
				'Hoenn',
				'Sinnoh',
				'Unova',
				'Kalos',
				'Alola',
				'Galar',
				'Hisui',
				'Other'
			].includes(region)
		),
	sprite: z.string().min(1, { message: 'Sprite is required' })
});

const FormAvatar = () => {
	const router = useRouter();
	const [errors, setErrors] = useState<{
		name: string;
		region: string;
		sprite: string;
	}>({
		name: '',
		region: '',
		sprite: ''
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		const form = event.currentTarget;
		try {
			avatarSchema.parse({
				name: form.avatar.value,
				region: form.region.value,
				sprite: form.sprite.value
			});
			const formData = new FormData(form);

			toast.promise(addAvatar(formData), {
				loading: 'Creating avatar...',
				success: response => {
					if (response.status) {
						throw new Error(response.message);
					}
					form.reset();
					form.avatar.focus();
					router.refresh();
					return `Avatar ${response.name} added`;
				},
				error: error => {
					return error.message;
				}
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors({
					name:
						error.errors.find(e => e.path[0] === 'name')?.message ?? '',
					region:
						error.errors.find(e => e.path[0] === 'region')?.message ?? '',
					sprite:
						error.errors.find(e => e.path[0] === 'sprite')?.message ?? ''
				});
			}
		}
	};

	const handleChange = () => {
		setErrors({
			name: '',
			region: '',
			sprite: ''
		});
	};

	return (
		<div>
			<h2>Upload Avatar</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="avatar">Avatar Name</label>
				<input
					type="text"
					name="avatar"
					id="avatar"
					placeholder="Name"
					onChange={handleChange}
				/>
				{errors.name && <span>{errors.name}</span>}
				<select name="region" onChange={handleChange}>
					<option value="">Select Region</option>
					<option value="Kanto">Kanto</option>
					<option value="Johto">Johto</option>
					<option value="Hoenn">Hoenn</option>
					<option value="Sinnoh">Sinnoh</option>
					<option value="Unova">Unova</option>
					<option value="Kalos">Kalos</option>
					<option value="Alola">Alola</option>
					<option value="Galar">Galar</option>
					<option value="Hisui">Hisui</option>
					<option value="Other">Other</option>
				</select>
				{errors.region && <span>{errors.region}</span>}
				<label htmlFor="sprite">Sprite</label>
				<input
					type="text"
					name="sprite"
					id="sprite"
					placeholder="Sprite"
					onChange={handleChange}
				/>
				{errors.sprite && <span>{errors.sprite}</span>}
				<button>Add</button>
			</form>
		</div>
	);
};

export default FormAvatar;
