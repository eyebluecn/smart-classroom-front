import {ResultCode} from "../result/ResultCode";

export default class CommonError extends Error {

    //错误码
    code: string = ResultCode.UNKNOWN

    constructor(code: string, message: string) {
        super(message);
        this.code = code
    }

}