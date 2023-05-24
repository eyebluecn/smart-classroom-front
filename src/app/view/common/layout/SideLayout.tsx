import {Layout, Menu} from "antd";
import React from 'react'
import MenuItem from "./menu/MenuItem";
import {Link, useNavigate} from "react-router-dom";
import {useUpdate} from "ahooks";
import AvatarPng from "../../../assets/img/avatar.png"
import AvatarLoginSvg from "../../../assets/img/avatar_login.svg"
import "./SideLayout.less"
import IManager from "./menu/IManager";

interface Props {
    menuManager: IManager;
    avatarUrl?: string;
}

const SideLayout: React.FC<Props> = (props: Props) => {

    const update = useUpdate();
    const menuManager: IManager = props.menuManager;
    const menuItems: MenuItem[] = menuManager.getMenuItems();

    const navigate = useNavigate();


    /**
     * 子菜单被点击后的情况
     */
    let onSelect = function (param: any) {

        menuManager.selectMenu(param.key);

        console.log("点击了菜单", param.key)
        //打到对应的页面中。
        if (param.key == menuManager.getLogoutPath()) {

            //退出登录。
            navigate(menuManager.getLoginPath());
        } else {
            navigate(param.key);
        }

        update();
    }


    /**
     * subMenu被点击后的情况
     */
    let onOpenChange = function (openKeys: React.Key[]) {

        menuManager.openChange(openKeys);

        update();
    }


    return (
        <Layout.Sider className={'frame-layout-side'}>
            <div>
                <div className='avatar-area'>
                    {menuManager.hasLogin() ? (
                        <Link className='username-text' to={''}>
                            <img
                                alt='avatar'
                                className='avatar-middle'
                                src={props.avatarUrl ? props.avatarUrl : AvatarLoginSvg}
                            />
                        </Link>
                    ) : (
                        <img
                            alt='avatar'
                            className='avatar-middle'
                            src={AvatarPng}
                        />
                    )}
                </div>
                <div className='username-area'>
                    {menuManager.hasLogin() ? (
                        <Link to={''}>
                            <span className='username-text'>{menuManager.username()}</span>
                        </Link>
                    ) : (
                        <span className='username-text'>未登录</span>
                    )}
                </div>
            </div>

            <Menu
                theme='dark'
                selectedKeys={menuManager.getSelectedKeys()}
                onClick={onSelect}
                openKeys={menuManager.getOpenKeys()}
                onOpenChange={onOpenChange}
                mode='inline'
            >
                {menuItems.map((menuItem: MenuItem, index: number) => {

                    if (menuItem.subMenuItems.length > 0) {
                        return (
                            <Menu.SubMenu
                                key={menuItem.name}
                                icon={menuItem.icon}
                                title={menuItem.name}>
                                {menuItem.subMenuItems.map((subMenuItem: MenuItem, subIndex: number) => {
                                    return <Menu.Item key={subMenuItem.url}>{subMenuItem.name}</Menu.Item>;
                                })}
                            </Menu.SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={menuItem.url}>
                                {menuItem.icon}
                                <span>{menuItem.name}</span>
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>

        </Layout.Sider>
    )
}

export default SideLayout
