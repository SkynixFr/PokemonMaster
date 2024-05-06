'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import FormLogin from '../../../front/components/Login/formLogin';

const Login = () => {
	return (
		<div>
			<Link href={'/'}>Go Back</Link>
			<h1>Page de connexion</h1>
			<FormLogin></FormLogin>
		</div>
	);
};

export default Login;
