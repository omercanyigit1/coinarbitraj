import { userActions } from '@/redux/actions';
import { useAppDispatch } from '@/redux/store';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';

export default function RegisterPage() {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const response = await dispatch(userActions.registerUser(values));

        if (response.meta.requestStatus === 'fulfilled') {
            message.success('Kayıt başarılı!');

            router.replace('/');
        } else {
            message.error('Kayıt yapılırken hata oluştu');
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