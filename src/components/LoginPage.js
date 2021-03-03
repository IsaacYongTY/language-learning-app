import { Form, Input, Button, Checkbox, Card } from 'antd';
import React, { useState } from 'react'
import '../scss/_LoginPage.scss'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const LoginPage = (props) => {

    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')

    const history = useHistory()
    const onFinish = (values) => {

        let { email, password } = values
        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
            console.log('login successful')

            history.push('/')
        }).catch((error) => {

        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        return 'Login failed'
    };

    return (

        <div className="login-page">

            <h1>Welcome</h1>
            <Card className="login-card">


                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button  id="login-button" type="primary" onClick={onFinishFailed}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
            );


};

export default LoginPage