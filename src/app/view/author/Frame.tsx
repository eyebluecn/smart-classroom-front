import React, {useEffect, useState} from 'react';
import type {MenuProps} from 'antd';
import {Dropdown, Layout, Space} from 'antd';
import SideLayout from "../common/layout/SideLayout";
import {Link, Outlet} from "react-router-dom";
import "./Frame.less"
import {DownOutlined, LoadingOutlined} from '@ant-design/icons';
import ReaderMenuManager from "../common/layout/menu/ReaderMenuManager";
import AuthorMenuManager from "../common/layout/menu/AuthorMenuManager";



const {Header, Content, Footer} = Layout;


const Frame: React.FC = () => {

    let [initialized, setInitialized] = useState(false)

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
        <Layout hasSider className={'frame-author'}>
            <SideLayout menuManager={new AuthorMenuManager()}/>
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
                                        作者版
                                        <DownOutlined/>
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content className={'content-container'}>
                    <h1>
                        欢迎来到作者版
                    </h1>
                    <div>
                        读者版还在开发中，请使用 <Link to={'/reader'}>读者版</Link> 或者 <Link to={'/editor'}>小编版</Link>
                    </div>
                </Content>
                <Footer className={'footer-container'}>智慧课堂 ©2023 版权所有</Footer>
            </Layout>
        </Layout>
    );
};

export default Frame;