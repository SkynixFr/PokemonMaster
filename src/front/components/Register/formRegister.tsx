'use client';

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';

// Actions
import { register } from '../../actions/user.actions';
const userSchema = z
	.object({
		username: z
			.string()
			.min(1, { message: 'Name is required' })
			.refine(username => /^[a-zA-Z0-9_]{3,16}$/.test(username), {
				message:
					'Username must be between 3 and 16 characters long and contain only letters, numbers, and underscores'
			}),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string().refine(
			password => {
				const isValid = password.match(
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
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

const FormRegister = () => {
	const router = useRouter();
	const [errors, setErrors] = useState<{
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
	}>({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const onsubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		const form = event.currentTarget;
		try {
			userSchema.parse({
				username: form.username.value,
				email: form.email.value,
				password: form.password.value,
				confirmPassword: form.confirmPassword.value
			});
			const formData = new FormData(form);

			toast.promise(register(formData), {
				loading: 'Registering...',
				success: response => {
					if (response.status) {
						throw new Error(response.message);
					}
					form.reset();
					form.username.focus();
					router.refresh();
					router.push('/login');
					return 'User registered successfully!';
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
						'',
					email:
						error.errors.find(e => e.path[0] === 'email')?.message ?? '',
					password:
						error.errors.find(e => e.path[0] === 'password')?.message ??
						'',
					confirmPassword:
						error.errors.find(e => e.path[0] === 'confirmPassword')
							?.message ?? ''
				});
			}
		}
	};
	const handleChange = () => {
		setErrors({
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		});
	};
	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={onsubmit} onChange={handleChange}>
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" />
					{errors.username && <span>{errors.username}</span>}
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="email" />
					{errors.email && <span>{errors.email}</span>}
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" />
					{errors.password && <span>{errors.password}</span>}
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
					/>
					{errors.confirmPassword && <span>{errors.confirmPassword}</span>}
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default FormRegister;
