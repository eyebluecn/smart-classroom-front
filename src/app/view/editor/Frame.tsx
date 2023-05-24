import React, {useEffect, useState} from 'react';
import type {MenuProps} from 'antd';
import {Dropdown, Layout, Space} from 'antd';
import SideLayout from "../common/layout/SideLayout";
import {Link, Outlet, useNavigate} from "react-router-dom";
import "./Frame.less"
import {DownOutlined, LoadingOutlined} from '@ant-design/icons';
import {useRequest} from "ahooks";
import EditorService from "../../service/editor/EditorService";
import Editor from "../../model/editor/Editor";
import Moon from "../../universal/Moon";
import MessageBoxUtil from "../../utility/MessageBoxUtil";
import CommonError from "../../model/base/error/CommonError";
import EditorPng from "../../assets/img/avatar_editor.svg"
import ReaderMenuManager from "../common/layout/menu/ReaderMenuManager";
import {ResultCode} from "../../model/base/result/ResultCode";
import EditorMenuManager from "../common/layout/menu/EditorMenuManager";

const {Header, Content, Footer} = Layout;


const Frame: React.FC = () => {

    let [initialized, setInitialized] = useState(false)

    const navigate = useNavigate();

    //首先进行登录。
    const editorRequest = useRequest(EditorService.httpTinyLogin, {
        manual: true,
        debounceWait: 100,
        onSuccess: (editor: Editor, params: any) => {
            Moon.editor = editor
            setInitialized(true)
        },
        onError: (e: CommonError, params: any) => {
            MessageBoxUtil.error(e.message)
            setInitialized(true)
            if (e.code === ResultCode.LOGIN) {
                console.log('将自动转跳')
                navigate('/editor/login');
            }
        }
    });


    useEffect(() => {
        editorRequest.run()
    }, [])


    if (!initialized || editorRequest.loading) {
        return <div className={'frame-loading'}>
            <div>
                <LoadingOutlined style={{fontSize: "24px"}}/>
            </div>
            <div>
                加载中...
            </div>
        </div>
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to={'/reader'}>切到读者版</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={'/author'}>切到作者版</Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to={'/editor'}>切到小编版</Link>
            ),
        }
    ];

    return (
        <Layout hasSider className={'frame-editor'}>
            <SideLayout avatarUrl={EditorPng} menuManager={new EditorMenuManager()}/>
            <Layout className="site-layout">
                <Header className={'top-bar-container'}>
                    <div className={'top-bar'}>
                        <div className={'title'}>
                            智慧课堂
                        </div>
                        <div className={'version'}>
                            <Dropdown menu={{items}}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        小编版
                                        <DownOutlined/>
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content className={'content-container'}>
                    <Outlet/>
                </Content>
                <Footer className={'footer-container'}>智慧课堂 ©2023 版权所有</Footer>
            </Layout>
        </Layout>
    );
};

export default Frame;