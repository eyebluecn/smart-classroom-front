import React from 'react';

export default class MenuItem {
    name: string;
    url: string;
    icon?: React.ReactNode;
    active: boolean = false;
    subMenuItems: MenuItem[] = [];

    constructor(name: string, url: string | null, icon?: React.ReactNode) {
        this.name = name;

        if (url) {
            this.url = url;
        } else {
            this.url = '';
        }
        this.icon = icon;

        //当前的url完全一致，那么就高亮显示
        if (url == '/user/login') {
            this.active = window.location.pathname === url || window.location.pathname === '/user/register';
        } else {
            this.active = window.location.pathname === url;
        }

    }
}
