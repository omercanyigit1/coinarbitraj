import { userActions } from '@/redux/actions';
import { useAppDispatch } from '@/redux/store';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const response = await dispatch(userActions.loginUser(values));

        if (response.meta.requestStatus === 'fulfilled') {
            message.success('Login başarılı!');

            router.replace('/');
        } else {
            message.error('Kullanıcı adı veya şifre hatalı');
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