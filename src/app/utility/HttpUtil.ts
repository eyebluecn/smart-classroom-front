import axios, {AxiosRequestConfig} from "axios";
import SafeUtil from "./SafeUtil";


//http请求全部收口在这个工具类中，可以快速切换http框架。
export default class HttpUtil {





  static httpGet(url: any, params = {}, successCallback?: any, errorCallback?: any, finallyCallback?: any, opts?: any) {

    axios
      .get(url, {
        params: params
      })
      .then(function (response) {
        SafeUtil.safeCallback(successCallback)(response)

      })
      .catch(function (error) {

        SafeUtil.safeCallback(errorCallback)(error)

      })
      .then(function (res) {

        SafeUtil.safeCallback(finallyCallback)(res)

      });
  }


  static httpPost(url: any, params = {}, successCallback?: any, errorCallback?: any, finallyCallback?: any, opts?: AxiosRequestConfig) {


    //如果需要跨域，可以使用这句话
    //axios.defaults.withCredentials = true


    axios
      .post(url, params, opts)
      .then(function (response) {


        SafeUtil.safeCallback(successCallback)(response)

      })
      .catch(function (error) {


        SafeUtil.safeCallback(errorCallback)(error)

      })
      .then(function (res) {


        SafeUtil.safeCallback(finallyCallback)(res)

      });
  }


}

