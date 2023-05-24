/**
 * 管理当前所有的菜单
 */
import React from 'react';
import MenuItem from './MenuItem';
import BrowserUtil from "../../../../utility/BrowserUtil";


export default abstract class IManager {


    protected constructor() {

    }

    /**
     * 获取到SubMenu展开的情况
     */
    getOpenKeys(): string[] {
        //获取到第一级菜单高亮的
        return this.readLocalOpenNames();
    }

    /**
     * 获取到当前高亮的菜单，子菜单高亮的情况。
     */
    getSelectedKeys(): string[] {

        let selectedKeys: string[] = [];
        let menuItems: MenuItem[] = this.getMenuItems();

        for (let menuItem of menuItems) {

            if (menuItem.subMenuItems.length > 0) {
                //有字节点的情况
                for (let subMenuItem of menuItem.subMenuItems) {
                    if (subMenuItem.active) {
                        //如果是作为子节点，使用url作为key
                        selectedKeys.push(subMenuItem.url);
                    }
                }

            } else {
                //没有子节点的情况
                if (menuItem.active) {
                    selectedKeys.push(menuItem.url);
                }
            }


        }

        return selectedKeys;
    }

    /**
     * 高亮某个菜单
     */
    selectMenu(url: string) {

        let menuItems: MenuItem[] = this.getMenuItems();

        for (let menuItem of menuItems) {

            menuItem.active = menuItem.url === url;
            for (let subMenuItem of menuItem.subMenuItems) {
                subMenuItem.active = subMenuItem.url === url;
            }
        }
    }

    openChange(openKeys: React.Key[]) {
        this.writeLocalOpenNames(openKeys);


    }


    //设置本地缓存情况
    private writeLocalOpenNames(openNames: React.Key[]) {
        //初始化当前的展开情况。
        BrowserUtil.saveToLocalStorage(this.getStorageKey(), JSON.stringify(openNames));

    }

    //获取本地缓存情况
    private readLocalOpenNames(): string[] {
        //初始化当前的展开情况。
        let openNamesString = BrowserUtil.readLocalStorage(this.getStorageKey());
        if (openNamesString) {
            return JSON.parse(openNamesString);
        } else {
            this.writeLocalOpenNames([]);
            return [];
        }
    }

    abstract hasLogin(): boolean;

    abstract username(): string | null;

    abstract getStorageKey(): string;

    abstract getLoginPath(): string;

    abstract getLogoutPath(): string;

    abstract getMenuItems(): MenuItem[];


}
