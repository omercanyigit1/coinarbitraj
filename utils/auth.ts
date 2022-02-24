import cookie from 'cookie';
import { NextPageContext } from 'next';

export function getSession(ctx: NextPageContext) {

    if (ctx.req.headers.cookie) {
        const auth_cookie = cookie.parse(ctx.req.headers.cookie);

        return auth_cookie;
    }

    return undefined;
}