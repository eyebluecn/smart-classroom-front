import {message} from 'antd';
import StringUtil from './StringUtil';

export default class MessageBoxUtil {

    /**
     * 统一的提示框
     * 会对长度进行限制
     *
     */
    static success(content?: string) {

        if (!content) {
            content = '成功了';
        }

        content = StringUtil.digest(content, 200, 10);
        message.success(content).then(r => {
        });
    }

    /**
     * 统一的提示框
     * 会对长度进行限制
     *
     */
    static info(content: string) {

        if (!content) {
            content = '空的消息';
        }

        content = StringUtil.digest(content, 200, 10);
        message.info(content).then(r => {
        });
    }

    /**
     * 统一的提示框
     * 会对长度进行限制
     *
     */
    static error(content: string) {

        if (!content) {
            content = '出错了';
        }

        content = StringUtil.digest(content, 200, 10);
        message.error(content).then(r => {
        });
    }


    /**
     * 统一的提示框
     * 会对长度进行限制
     *
     */
    static warning(content: string) {

        if (!content) {
            content = '警告';
        }

        content = StringUtil.digest(content, 200, 10);
        message.warning(content).then(r => {
        });
    }


}
