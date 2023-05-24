export default class BrowserUtil {

    //根据cookie键，读取cookie值
    static readCookie(name: any) {
        let nameEQ = name + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }


    /**
     *
     * 获取url地址栏的参数
     * // query string: ?foo=lorem&bar=&baz
     * var foo = getParameterByName('foo'); // "lorem"
     * var bar = getParameterByName('bar'); // "" (present with empty value)
     * var baz = getParameterByName('baz'); // "" (present with no value)
     * var qux = getParameterByName('qux'); // null (absent)
     * @param name
     * @param url
     * @returns {*}
     */
    static getParameterByName(name: string, url?: string): string | null {

        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, '\\$&');

        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        let results = regex.exec(url);

        if (!results) {
            return null;
        }

        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }


    /**
     * 半颜的方法。注释待补充
     * @param name
     * @returns {*}
     */
    static getQueryString(name: any) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }


    static isLocalStorageNameSupported() {
        let testKey = 'test';
        let storage = window.localStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }


    static readLocalStorage(key: any) {
        if (BrowserUtil.isLocalStorageNameSupported()) {
            return window.localStorage[key];
        } else {
            console.error('not support localStorage.');
            return null;
        }
    }

    static saveToLocalStorage(key: any, content: any) {
        if (BrowserUtil.isLocalStorageNameSupported()) {
            window.localStorage[key] = content;
        } else {
            console.error('not support localStorage.');
        }
    }


    static removeLocalStorage(key: any) {
        if (BrowserUtil.isLocalStorageNameSupported()) {
            window.localStorage.removeItem(key);
        } else {
            console.error('not support localStorage.');
        }
    }


    /**
     * 获取完整的host
     * eg:
     * https://himmr.mshk-inc.com
     */
    static fullHost() {
        return window.location.protocol + '//' + window.location.host;
    }

    //从一个pathname和param中获取到真正的链接
    static getFullUrl(pathname: string, params: any) {
        let search: string = '';

        let needQuestion: boolean = true;

        if (pathname.indexOf('?') !== -1) {
            needQuestion = false;
        }

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (search == '') {
                    if (needQuestion) {
                        search = search + '?' + key + '=' + params[key];
                    } else {
                        search = search + '&' + key + '=' + params[key];
                    }

                } else {
                    search = search + '&' + key + '=' + params[key];
                }

            }

        }

        return pathname + search;
    }


    //获取当前浏览器的宽度
    static getBrowserWidth(): number {
        return document.body.clientWidth;
    }


}
