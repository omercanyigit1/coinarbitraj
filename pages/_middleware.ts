import { verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const SIGN_PAGES = {
    LOGİN: '/auth/login',
    REGISTER: '/auth/register'
};

const PROTECTED_PAGES = {
    HOME: '/'
};

export default function middleware(req: NextRequest) {
    const AUTH_SECRET = process.env.AUTH_SECRET;

    const { cookies } = req;

    const next_auth_coinarbitage_jwt_verify = cookies?.next_auth_coinarbitage_jwt_verify;

    const PAGE_URL = req.nextUrl.pathname;

    if (Object.values(SIGN_PAGES).includes(PAGE_URL)) {
        try {
            verify(next_auth_coinarbitage_jwt_verify, AUTH_SECRET);

            return NextResponse.redirect('/', 308);
        } catch (err) {
            return NextResponse.next();
        }
    }

    if (Object.values(PROTECTED_PAGES).includes(PAGE_URL)) {
        try {
            verify(next_auth_coinarbitage_jwt_verify, AUTH_SECRET);

            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect('/auth/login', 307);
        }
    }

    return NextResponse.next();
}