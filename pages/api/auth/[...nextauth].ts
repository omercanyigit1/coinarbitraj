import { UserService } from '@/services';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

export default NextAuth({
    session: {
        strategy: 'jwt',

        // maxAge: 60 * 60 * 24 * 30 // 60sn * 60dk * 24 sa(1 gün) * gün sayısı // 
    },
    secret: SECRET_KEY,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: undefined,
            async authorize(credentials, req) {
                let response;

                if (credentials.isNewUser) {
                    response = await UserService.register({
                        email: credentials.email,
                        password: credentials.password,
                        name: credentials.name,
                        surname: credentials.surname
                    });
                } else {
                    response = await UserService.login({
                        email: credentials.email,
                        password: credentials.password
                    });
                }

                console.log('authorize-response', response);

                if (response.success) {
                    // Any object returned will be saved in `user` property of the JWT
                    return { email: credentials.email, password: credentials.password };
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
        error: '/auth/error',
    },
    callbacks: {
        async session({ session, token, user }) {
            // console.log('sessionnnn', { session, token, user });

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // console.log('jwttt', { token, user, account, profile, isNewUser });

            return token;
        }
    }
});