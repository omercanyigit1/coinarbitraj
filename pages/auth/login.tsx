import { BuiltInProviderType } from 'next-auth/providers';
import { signIn, getProviders, getCsrfToken, getSession, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';

type LoginPageProps = {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
    csrfToken: string;
}

export default function LoginPage({ providers, csrfToken }: LoginPageProps) {
    const router = useRouter();

    const onFinish = async (values: any) => {
        const { email, password } = values;

        const user = { email, password };

        const response = await signIn(providers.credentials.id, { redirect: false, ...user });

        if (response.ok && !response.error) {
            message.success('Login başarılı');

            router.push('/');
        }

        if (response.error) {
            message.error('Kullanıcı adı veya şifre hatalı');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        // eslint-disable-next-line no-console
        console.log('Failed Login:', errorInfo);
    };

    return (
        // <>
        //     Not signed in <br />
        //     <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

        //     <button type="submit" onClick={handleSubmit}
        //         style={{ background: `gray`, color: `white` }}>
        //         Sign in with {providers.credentials.name}
        //     </button>
        // </>
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Input type="hidden" name="csrfToken" defaultValue={csrfToken} />

            <Form.Item
                label="E-mail"
                name="email"
                rules={[{ message: 'Please input your email!', required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ message: 'Please input your password!', required: true }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
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