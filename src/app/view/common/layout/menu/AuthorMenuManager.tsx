/**
 * 管理当前所有的菜单
 */
import React from 'react';
import MenuItem from './MenuItem';
import {AndroidOutlined, PoweroffOutlined, TeamOutlined,} from '@ant-design/icons';
import Moon from "../../../../universal/Moon";
import IManager from "./IManager";


export default class AuthorMenuManager extends IManager {

    constructor() {
        super()
    }

    getMenuItems(): MenuItem[] {

        let menuItems: MenuItem[] = [];

        let columnItems: MenuItem = new MenuItem('去读者版', `/reader/column/list`, <AndroidOutlined/>);
        menuItems.push(columnItems);

        let columnItems1: MenuItem = new MenuItem('去小编版', `/editor/column/list`, <AndroidOutlined/>);
        menuItems.push(columnItems1);



        return menuItems;

    }


    getStorageKey(): string {
        return 'author-menu-open-names';
    }

    getLogoutPath(): string {
        return "/author/logout";
    }

    getLoginPath(): string {
        return "/author/login";
    }

    hasLogin(): boolean {
        return Moon.hasAuthorLogin();
    }

    username(): string | null {
        return Moon.author.username;
    }


}
