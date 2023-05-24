import axios from "axios";
import CommonError from "../../model/base/error/CommonError";
import {ResultCode} from "../../model/base/result/ResultCode";
import qs from 'qs';

export default class BaseService {

    //从一个返回中获取出其错误信息。适配各种错误的类型。
    public static getErrorMessage(response: any) {

        let msg = '服务器出错，请稍后再试!'

        if (!response) {
            msg = '出错啦，请稍后重试！'
        } else if (typeof response === 'string') {
            msg = response
        } else if (response['msg']) {
            msg = response['msg']
        } else if (response['message']) {
            msg = response['message']
        } else {
            let temp = response['data']
            if (temp !== null && typeof temp === 'object') {
                if (temp['message']) {
                    msg = temp['message']
                } else if (temp['msg']) {
                    msg = temp['msg']
                } else {
                    if (temp['error'] && temp['error']['message']) {
                        msg = temp['error']['message']
                    }
                }
            }
        }
        return msg
    }

    /**
     * get请求方法
     * 正常返回数据的json结构体。
     * 异常返回ScError异常
     */
    public static async httpGet(url: string, params = {}): Promise<any> {

        return new Promise((resolve, reject) => {

            axios
                .get(url, {
                    params: params
                })
                .then(function (response) {

                    resolve(response.data.data)

                })
                .catch(function (error) {

                    let response = error.response
                    let errorMessage = BaseService.getErrorMessage(response);

                    let code = ResultCode.UNKNOWN
                    if (response && response.data.code) {
                        code = response.data.code
                    }

                    let scError = new CommonError(code, errorMessage);

                    reject(scError)


                });

        })


    }

    /**
     * post请求方法
     * 正常返回数据的json结构体。
     * 异常返回ScError异常
     */
    public static async httpPost(url: string, params = {}): Promise<any> {

        let formData = qs.stringify(params);

        let opts = {}

        if (!opts['headers']) {
            opts['headers'] = {};
        }
        opts['headers']['Content-Type'] = 'application/x-www-form-urlencoded';

        return new Promise((resolve, reject) => {

            axios
                .post(url, params, opts)
                .then(function (response) {

                    resolve(response.data.data)

                })
                .catch(function (error) {

                    let response = error.response
                    let errorMessage = BaseService.getErrorMessage(response);

                    let code = ResultCode.UNKNOWN
                    if (response && response.data.code) {
                        code = response.data.code
                    }

                    let scError = new CommonError(code, errorMessage);

                    reject(scError)


                });

        })


    }

}