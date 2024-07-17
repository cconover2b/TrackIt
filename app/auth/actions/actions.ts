// app/auth/actions/actions.ts
'use server'

import { hashPassword } from '@/lib/utils'; // Corrected function name
import { UserModel } from '@/schemas/user';
import { redirect } from 'next/navigation';
import { connectToDB } from '@/lib/db';
import * as yup from 'yup';

const User = yup.object({
    firstname: yup.string().required('firstname is required').min(1),
    lastname: yup.string().required('lastname is required').min(1),
    email: yup.string().required('email is required').email(),
    password: yup.string().required('password is required').min(6),
});

export async function registerUser(prevState: any, formData: FormData) {
    try {
        const firstname = formData.get('firstname')?.toString() || '';
        const lastname = formData.get('lastname')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        await User.validate({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        }, {
            abortEarly: false,
        });

        const hash = await hashPassword(password);

        await connectToDB();

        await UserModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
        });

        redirect('/auth/signin');
    } catch (error) {
        console.log(error);
        const e = error as any;
        return {
            message: e.errors || 'Failed to register user',
        };
    }
}