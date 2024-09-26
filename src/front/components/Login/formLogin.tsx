'use client';

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
// Actions
import { login } from '../../actions/user.actions';
import CustomImage from '../customImage';
import { MoveLeft } from 'lucide-react';

const userSchema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.max(30, { message: 'Email must be 30 characters or less' }),
	password: z.string().refine(
		password => {
			const isValid = password.match(
				'^(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[A-Za-z\\d\\W]{8,}$'
			);
			return isValid;
		},
		{
			message:
				'Password must contain at least one uppercase letter, one lowercase letter, and one number and one special character and must be at least 8 characters long'
		}
	)
});

const FormLogin = () => {
	const router = useRouter();
	const [errors, setErrors] = useState<{ email: string; password: string }>({
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
				loading: 'Logging in...',
				success: response => {
					if (response.status) {
						throw new Error(response.message);
					}
					// Save the access token and refresh token in the local storage
					localStorage.setItem('accessToken', response.accessToken);
					localStorage.setItem('refreshToken', response.refreshToken);
					form.reset();
					form.email.focus();
					router.push('/profile');
					return 'User logged in successfully!';
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
		<div className="form-container">
			<div className="Go-Back-container">
				<MoveLeft />
				<Link href={'/'} className="back-link">
					Go Back
				</Link>
			</div>

			<div className={'form-background'}>
				<CustomImage
					src={`/images/backgrounds/pokemonMaster-bg-login.jpg`}
					alt={'background login'}
					width={10000}
					height={10000}
				/>
			</div>
			<form
				onSubmit={onsubmit}
				onChange={handleChange}
				className="form-wrapper"
			>
				<div className="form-logo">
					<CustomImage
						src={`/images/compressed/other/logo.png`}
						alt={'pokemonMaster logo'}
						width={150}
						height={150}
					/>
				</div>
				<h1 className="form-title">SIGN IN</h1>
				<div className="input-group">
					<label htmlFor="email" className="input-label">
						Email
					</label>
					{errors.email && (
						<span className="error-text">{errors.email}</span>
					)}
					<input
						type="email"
						name="email"
						id="email"
						className="input-field"
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password" className="input-label">
						Password
					</label>
					{errors.password && (
						<span className="error-text">{errors.password}</span>
					)}
					<input
						type="password"
						name="password"
						id="password"
						className="input-field"
					/>
				</div>
				<div className="button-wrapper">
					<button type="submit" className="login-button">
						Login
					</button>
				</div>
				<div className="form-footer">
					<span>Don't have an account ? </span>
					<Link href={'/signin'} className="register-link">
						Register here
					</Link>
				</div>
			</form>
		</div>
	);
};

export default FormLogin;
