import { BuiltInProviderType } from 'next-auth/providers';
import { signIn, getProviders, getCsrfToken, getSession, LiteralUnion, ClientSafeProvider } from 'next-auth/react';

type LoginPageProps = {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
    csrfToken: string;
}

export default function LoginPage({ providers, csrfToken }: LoginPageProps) {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email: 'aliselcuk@coinarbitrage.com', id: 1, name: 'Ali Selcuk' };

        await signIn(providers.credentials.id, { callbackUrl: '/', redirect: true, ...user });
    };

    return (
        <>
            Not signed in <br />
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

            <button type="submit" onClick={handleSubmit}
                style={{ background: `gray`, color: `white` }}>
                Sign in with {providers.credentials.name}
            </button>
        </>
    );
}

export async function getServerSideProps(ctx) {

    const session = await getSession(ctx);

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        };
    }

    const csrfToken = await getCsrfToken();
    const providers = await getProviders();

    return {
        props: {
            csrfToken,
            providers
        }
    };
}