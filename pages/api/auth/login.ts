import { UserService } from '@/services';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const AUTH_SECRET = process.env.AUTH_SECRET;

    const response = await UserService.login({
        email: email,
        password: password
    });

    if (response.success) {
        const next_auth_coinarbitage_jwt_cookie = serialize('next_auth_coinarbitage_jwt', response.data, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });

        const tokenWithSecret = sign(response.data, AUTH_SECRET);

        const next_auth_coinarbitage_jwt_verify_cookie = serialize('next_auth_coinarbitage_jwt_verify', tokenWithSecret, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });

        res.setHeader('Set-Cookie', [next_auth_coinarbitage_jwt_cookie, next_auth_coinarbitage_jwt_verify_cookie]);

        res.status(200).json({ message: 'login_success' });

    } else {
        res.status(404).json({ message: 'login_failed' });
    }
}