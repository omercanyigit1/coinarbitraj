import { UserService } from '@/services';
import { serialize } from 'cookie';

export default async function (req, res) {
    const { email, password, name, surname } = req.body;

    const response = await UserService.register({
        email,
        name,
        password,
        surname
    });

    if (response.success) {
        const serialised = serialize('next_auth_coinarbitage_jwt', response.data, {
            httpOnly: false,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });

        res.setHeader('Set-Cookie', serialised);

        res.status(200).json({ message: 'register_success' });
    } else {
        res.status(404).json({ message: 'register_failed' });
    }
}