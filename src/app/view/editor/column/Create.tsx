import './Create.less'
import Column from "../../../model/column/Column";
import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {useRequest} from "ahooks";
import MessageBoxUtil from "../../../utility/MessageBoxUtil";
import CommonError from "../../../model/base/error/CommonError";
import ColumnService from "../../../service/column/ColumnService";
import {useNavigate} from "react-router-dom";
import {Alert, InputNumber} from 'antd';
import TitleNavigation from "../../common/component/TitleNavigation";

function Create() {

    const navigate = useNavigate();

    const editorRequest = useRequest(ColumnService.httpCreate, {
        manual: true,
        debounceWait: 100,
        onSuccess: (editor: Column, params: any) => {

            MessageBoxUtil.success("创建成功")

            navigate("/editor/column/list")

        },
        onError: (e: CommonError, params: any) => {
            MessageBoxUtil.error(e.message)
        }
    });


    const onFinish = (values: any) => {
        console.log('Success:', values);
        editorRequest.run(values.authorName, values.columnName, values.columnPrice * 100)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className={"page-column-detail"}>
            <TitleNavigation name={'创建专栏'}/>

            <Row>
                <Col offset={2} span={16}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{columnPrice: 299}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="专栏名称"
                            name="columnName"
                            rules={[{required: true, message: '请输入专栏名称!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="作者名字"
                            name="authorName"
                            rules={[{required: true, message: '请输入作者名字!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="专栏价格（元）"
                            name="columnPrice"
                            rules={[{required: true, message: '请输入专栏价格!'}]}
                        >
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                创建专栏
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <div>
                                <Alert message="正常流程应该是和作者走完整的合同签订。为了方便演示，这里提供小编快速创建专栏和作者。" type="info" showIcon />
                            </div>
                        </Form.Item>


                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Create
