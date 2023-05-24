/**
 * 管理当前所有的菜单
 */
import React from 'react';
import MenuItem from './MenuItem';
import {AndroidOutlined, PoweroffOutlined, TeamOutlined,} from '@ant-design/icons';
import Moon from "../../../../universal/Moon";
import IManager from "./IManager";


export default class EditorMenuManager extends IManager {

    constructor() {
        super()
    }

    getMenuItems(): MenuItem[] {

        let menuItems: MenuItem[] = [];

        if (Moon.hasEditorLogin()) {

            let columnItems: MenuItem = new MenuItem('专栏', null, <AndroidOutlined/>);
            columnItems.subMenuItems.push(new MenuItem('专栏列表', `/editor/column/list`));
            menuItems.push(columnItems);

            menuItems.push(new MenuItem('退出登录', `/editor/logout`, <PoweroffOutlined/>));

        } else {
            menuItems.push(new MenuItem('登录', `/editor/login`, <TeamOutlined/>));
        }


        return menuItems;

    }


    getStorageKey(): string {
        return 'editor-menu-open-names';
    }

    getLogoutPath(): string {
        return "/editor/logout";
    }

    getLoginPath(): string {
        return "/editor/login";
    }

    hasLogin(): boolean {
        return Moon.hasEditorLogin();
    }

    username(): string | null {
        return Moon.editor.username;
    }


}
