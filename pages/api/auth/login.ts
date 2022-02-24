/* eslint-disable import/no-anonymous-default-export */
import { UserService } from '@/services';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    const response = await UserService.login({
        email: email,
        password: password
    });

    if (response.success) {
        const serialised = serialize('next_auth_coinarbitage_jwt', response.data, {
            httpOnly: false,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });

        res.setHeader('Set-Cookie', serialised);

        res.status(200).json({ message: 'login_success' });

    } else {
        res.status(404).json({ message: 'login_failed' });
    }
}