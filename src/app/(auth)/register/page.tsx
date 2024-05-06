'use client';
import React, { useState } from 'react';
import FormRegister from '../../../front/components/Register/formRegister';
import Link from 'next/link';

const RegisterPage = () => {
	return (
		<div>
			<Link href={'/'}>Go Back</Link>
			<h1>Register</h1>
			<FormRegister></FormRegister>
		</div>
	);
};

export default RegisterPage;
