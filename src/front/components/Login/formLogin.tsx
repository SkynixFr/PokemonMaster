'use client';

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';

// Actions
import { login } from '../../actions/user.actions';
const userSchema = z.object({
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
	)
});

const FormLogin = () => {
	const router = useRouter();
	const [errors, setErrors] = useState<{
		email: string;
		password: string;
	}>({
		email: '',
		password: ''
	});

	const onsubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		const form = event.currentTarget;
		try {
			userSchema.parse({
				email: form.email.value,
				password: form.password.value
			});
			const formData = new FormData(form);

			toast.promise(login(formData), {
				loading: 'login in...',
				success: response => {
					if (response.status) {
						throw new Error(response.message);
					}
					// Save the access token and refresh token in the local storage
					localStorage.setItem('accessToken', response.accessToken);
					localStorage.setItem('refreshToken', response.refreshToken);
					form.reset();
					form.email.focus();
					router.refresh();
					router.push('/');
					return 'User log in successfully!';
				},
				error: error => {
					return error.message;
				}
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors({
					email:
						error.errors.find(e => e.path[0] === 'email')?.message ?? '',
					password:
						error.errors.find(e => e.path[0] === 'password')?.message ??
						''
				});
			}
		}
	};
	const handleChange = () => {
		setErrors({
			email: '',
			password: ''
		});
	};
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={onsubmit} onChange={handleChange}>
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
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default FormLogin;
