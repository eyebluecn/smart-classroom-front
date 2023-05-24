import "./Login.less"
import React, {useEffect} from 'react';
import {Alert, Button, Col, Form, Input, Row} from 'antd';
import {useRequest} from "ahooks";
import CommonError from "../../../model/base/error/CommonError";
import MessageBoxUtil from "../../../utility/MessageBoxUtil";
import ReaderService from "../../../service/reader/ReaderService";
import Reader from "../../../model/reader/Reader";
import Moon from "../../../universal/Moon";
import {useNavigate} from "react-router-dom";
import Sun from "../../../universal/Sun";


const Login: React.FC = () => {

    let navigate = useNavigate();

    const readerLogoutRequest = useRequest(ReaderService.httpLogout, {
        manual: true,
        debounceWait: 100,
        onSuccess: (reader: void, params: any) => {
            Moon.reader = new Reader()


            console.log("读者退出成功")
            Sun.updateFrame()
        },
        onError: (e: CommonError, params: any) => {
            MessageBoxUtil.error(e.message)
        }
    });

    //首先登出。
    useEffect(() => {
        readerLogoutRequest.run()
    }, [])


    const readerRequest = useRequest(ReaderService.httpLogin, {
        manual: true,
        debounceWait: 100,
        onSuccess: (reader: Reader, params: any) => {
            Moon.reader = reader
            MessageBoxUtil.success("登录成功")


            Sun.updateFrame()
            navigate("/reader")

        },
        onError: (e: CommonError, params: any) => {
            MessageBoxUtil.error(e.message)
        }
    });


    const onFinish = (values: any) => {
        console.log('Success:', values);
        readerRequest.run(values.username, values.password)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className={'page-reader-login'}>
            <Row>
                <Col offset={2} span={16}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{username: "demo_reader", password: "123456"}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{required: true, message: '请输入用户名!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{required: true, message: '请输入密码!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <div>
                                <Alert message="读者演示账号:demo_reader 密码:123456" type="info" showIcon />


                            </div>
                        </Form.Item>


                    </Form>
                </Col>
            </Row>

        </div>
    )
};

export default Login;