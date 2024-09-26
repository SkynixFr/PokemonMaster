'use client';

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';

// Actions
import { register } from '../../actions/user.actions';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import CustomImage from '../customImage';
const userSchema = z
	.object({
		username: z
			.string()
			.min(1, { message: 'Name is required' })
			.refine(username => /^[a-zA-Z0-9_]{3,16}$/.test(username), {
				message:
					'Username must be between 3 and 16 characters long and contain only letters, numbers, and underscores'
			}),
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
					'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and must be at least 8 characters long'
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
					alt={'background sign up form'}
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
					<label htmlFor="username" className="input-label">
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						className="input-field"
					/>
					{errors.username && (
						<span className="error-text">{errors.username}</span>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="email" className="input-label">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="input-field"
					/>
					{errors.email && (
						<span className="error-text">{errors.email}</span>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="password" className="input-label">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="input-field"
					/>
					{errors.password && (
						<span className="error-text">{errors.password}</span>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="confirmPassword" className="input-label">
						Confirm Password
					</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						className="input-field"
					/>
					{errors.confirmPassword && (
						<span className="error-text">{errors.confirmPassword}</span>
					)}
				</div>
				<div className="button-wrapper">
					<button type="submit" className="register-button">
						Register
					</button>
				</div>
				<div className="form-footer">
					<span>Already have an Account ? </span>
					<Link href={'/login'} className="login-link">
						Login here
					</Link>
				</div>
			</form>
		</div>
	);
};

export default FormRegister;
