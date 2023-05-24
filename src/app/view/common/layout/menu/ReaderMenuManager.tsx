/**
 * 管理当前所有的菜单
 */
import React from 'react';
import MenuItem from './MenuItem';
import {AndroidOutlined, PoweroffOutlined, TeamOutlined,} from '@ant-design/icons';
import Moon from "../../../../universal/Moon";
import IManager from "./IManager";


export default class ReaderMenuManager extends IManager {

    constructor() {
        super()
    }

    getMenuItems(): MenuItem[] {

        let menuItems: MenuItem[] = [];

        if (Moon.hasReaderLogin()) {

            let columnItems: MenuItem = new MenuItem('专栏', null, <AndroidOutlined/>);
            columnItems.subMenuItems.push(new MenuItem('专栏列表', `/reader/column/list`));
            menuItems.push(columnItems);

            let subscriptionItems: MenuItem = new MenuItem('订阅', null, <AndroidOutlined/>);
            subscriptionItems.subMenuItems.push(new MenuItem('我的订阅', `/reader/subscription/list`));
            menuItems.push(subscriptionItems);

            menuItems.push(new MenuItem('退出登录', `/reader/logout`, <PoweroffOutlined/>));

        } else {
            menuItems.push(new MenuItem('登录', `/reader/login`, <TeamOutlined/>));
        }


        return menuItems;

    }


    getStorageKey(): string {
        return 'reader-menu-open-names';
    }

    getLogoutPath(): string {
        return "/reader/logout";
    }

    getLoginPath(): string {
        return "/reader/login";
    }

    hasLogin(): boolean {
        return Moon.hasReaderLogin();
    }

    username(): string | null {
        return Moon.reader.username;
    }


}
