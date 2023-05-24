export default class StringUtil {


    //转换成首字母小写的驼峰法
    static lowerCamel(str: any) {

        if (!str) {
            console.error('不能转换空的驼峰字符串。');
            return str;
        }

        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter: any, index: any) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }


    //转换成全部小写的使用 /分隔的字符串
    static lowerSlash(str: any) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter: any, index: any) {
            return '/' + letter.toLowerCase();
        }).replace(/\s+/g, '');
    }


    //将首字母大写
    static capitalize(str: any) {

        if (!str) {
            return str;
        }

        str = str.replace(/^\w/, (c: any) => c.toUpperCase());

        return str;
    }

    //获取一个function的名字
    static functionName(func: any) {
        // Match:
        // - ^          the beginning of the string
        // - function   the word 'function'
        // - \s+        at least some white space
        // - ([\w\$]+)  capture one or more valid JavaScript identifier characters
        // - \s*        optionally followed by white space (in theory there won't be any here,
        //              so if performance is an issue this can be omitted[1]
        // - \(         followed by an opening brace
        //
        let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

        return result ? result[1] : ''; // for an anonymous function there won't be a match
    }

    //check whether an obj is empty
    static isEmptyObject(obj: any) {

        if (!obj) {
            return true;
        }

        for (let key in obj) {
            return false;
        }
        return true;
    }


    /**
     * 获取到上num级路径
     * 例子： /himmr/setting/notification -> /himmr/setting
     * @param path 原路径
     * @param num 上几级，默认1级
     */
    static prePath(path: string, num: number = 1): string {
        if (!path) {
            return path;
        }

        //去除掉最后的/符号。
        let parts: string[] = path.split('/');
        //去除所有的空
        parts = parts.filter((item: string, index: number) => {
            return item !== '';
        });

        //前面几层就是删掉前面几个元素。如果超出了，会全部删掉。
        parts.splice(parts.length - num);

        return '/' + parts.join('/');
    }


    static startWith(str: any, prefix: any) {
        if (typeof prefix === 'undefined' || prefix === null || prefix === '' || typeof str === 'undefined' || str === null || str.length === 0 || prefix.length > str.length) {
            return false;
        }

        return str.substr(0, prefix.length) === prefix;
    }

    static endWith(str: any, suffix: any) {
        if (suffix === null || suffix === '' || str === null || str.length === 0 || suffix.length > str.length) {
            return false;
        }

        return str.substring(str.length - suffix.length) === suffix;
    }


    /**
     * 去除掉开头的前缀
     * @param str 待处理的字符串
     * @param prefix 前缀
     */
    static trimPrefix(str: string | null, prefix: string): string {

        if (!str) {
            return '';
        } else {
            if (str.substr(0, prefix.length) === prefix) {
                return str.substr(prefix.length);
            } else {
                return str;
            }
        }

    }

    /**
     * 去除掉后缀
     * @param str 待处理的字符串
     * @param suffix 前缀
     */
    static trimSuffix(str: string | null, suffix: string): string {

        if (!str) {
            return '';
        } else {
            if (str.substring(str.length - suffix.length) === suffix) {
                return str.substr(0, str.length - suffix.length);
            } else {
                return str;
            }
        }

    }


    //在字符串a后面追加字符串b
    static append(a: any, b: any, separator = '') {

        if (a === null || typeof a !== 'string') {
            return b;
        } else {
            return a + separator + b;
        }
    }


    static isBlank(text: string | null | undefined): boolean {

        if (text === null || text == undefined) {
            return true;
        }

        return text.trim() === '';

    }

    static isNotBlank(text: string | null | undefined): boolean {

        return !StringUtil.isBlank(text);

    }


    //将时间戳转换成62进制
    static generateUniqueCode(num?: number): string {
        //获取时间戳

        if (num === undefined) {
            num = new Date().getTime();
        }

        let standardString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result;
        let list: number[] = [];
        let len = standardString.length;
        let level;
        for (level = 0; Math.floor(num / len) > 0; level++) {
            result = num % len;
            list.push(result);
            num = (num - result) / len;
        }
        list.push(num);
        let code = '';
        list.forEach((item) => {
            code = standardString[item] + code;
        });
        return code;
    }

    //字符串转换成十进制
    static parseUniqueCode(str: string): number {

        let exchangeString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let strNew = str.split('');
        let list: number[] = [];
        strNew.map((item: string) => {
            list.push(exchangeString.indexOf(item));
        });
        let num = 0;
        for (let i = 0; i < list.length; i++) {
            num += list[i] * Math.pow(exchangeString.length, list.length - i - 1);
        }
        return num;
    }


    /**
     * 对于太长的文字，取前面和后面的部分，中间用...表示.
     * 默认后面保留6个自
     *
     * @param text      需要处理的文本
     * @param maxLength 最多保留多少个字符
     * @param tail      后面保留多少个字符
     * @return 经过处理的字符串
     */
    static digest(text: string | null, maxLength: number, tail: number = 6) {

        if (!text) {
            return '';
        }

        let dotString: string = '...';
        let totalLength: number = text.length;
        let dotLength: number = dotString.length;
        let head: number = maxLength - tail - dotLength;

        if (maxLength < tail || tail < 0 || head < 0) {
            console.error('大小指定不符合逻辑');
            return text;
        }

        if (StringUtil.isBlank(text)) {
            return text;
        } else {
            if (totalLength <= maxLength) {
                return text;
            } else {
                return text.substring(0, head) + dotString + text.substring(totalLength - tail);
            }
        }
    }


    /**
     * 将日志中的 |n| 还原成 \n
     */
    static recoverSafeLog(str: string | null) {

        if (!str) {
            return str;
        }

        const regex = /(\|n\|)/gm;
        const subst = `\n`;

        const result = str.replace(regex, subst);

        return result;
    }


    /**
     * 标准名称，仅包含英文、数字和下划线
     */
    static validateStandardName(str: string | null): boolean {

        if (!str) {
            return false;
        }

        const regex = /^[0-9A-Za-z_]+$/;

        return regex.test(str);

    }


}
