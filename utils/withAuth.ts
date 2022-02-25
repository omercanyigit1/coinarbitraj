import cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function withAuth(gssp: GetServerSideProps) {

    const AUTH_PAGE_URL = '/auth/login';
    const REGISTER_PAGE_URL = '/auth/register';

    return async (ctx: GetServerSidePropsContext) => {
        const { req } = ctx;

        try {
            const { next_auth_coinarbitage_jwt } = cookie.parse(req.headers.cookie || '');

            if (next_auth_coinarbitage_jwt && (req.url === AUTH_PAGE_URL || req.url === REGISTER_PAGE_URL)) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: true,
                    },
                };
            }

            if (!next_auth_coinarbitage_jwt) {

                if (req.url === AUTH_PAGE_URL || req.url === REGISTER_PAGE_URL) {
                    return await gssp(ctx);
                }

                return {
                    redirect: {
                        destination: '/auth/login',
                        permanent: false,
                    },
                };
            }

        } catch (error) {

            if (req.url === AUTH_PAGE_URL || req.url === REGISTER_PAGE_URL) {
                return await gssp(ctx);
            }

            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        return await gssp(ctx);
    };
}