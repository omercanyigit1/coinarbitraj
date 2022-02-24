import { BuiltInProviderType } from 'next-auth/providers';
import { signIn, getProviders, getCsrfToken, getSession, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';

type RegisterPageProps = {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
    csrfToken: string;
}

export default function RegisterPage({ providers, csrfToken }: RegisterPageProps) {
    const router = useRouter();

    const onFinish = async (values: any) => {
        const { email, password, name, surname } = values;

        const user = { email, isNewUser: true, name, password, surname  };

        const response = await signIn(providers.credentials.id, { redirect: false, ...user });

        if (response.ok && !response.error) {
            message.success('Register başarılı');

            router.push('/');
        }

        if (response.ok && response.error) {
            message.error(response.error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        // eslint-disable-next-line no-console
        console.log('Failed Login:', errorInfo);
    };

    return (
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
                label="Name"
                name="name"
                rules={[{ message: 'Please input your name!', required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Surname"
                name="surname"
                rules={[{ message: 'Please input your surname!', required: true }]}
            >
                <Input />
            </Form.Item>

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