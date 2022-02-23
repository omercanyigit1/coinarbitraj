import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        maxAge: 60 * 60 * 24 * 30 // 60sn * 60dk * 24 sa(1 gün) * gün sayısı // 
    },
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: undefined,
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: credentials.id, name: credentials.name, email: credentials.email };

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
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
        error: '/auth/error',
    },
    callbacks: {
        async session({ session }) {
            return session;
        }
    }
});