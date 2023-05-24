import Color from "../option/Color";
import ColorSelectionOption from "../option/ColorSelectionOption";


enum ResultCode {
    OK = "OK",
    LOGIN = "LOGIN",
    NOT_FOUND = "NOT_FOUND",
    BAD_REQUEST = "BAD_REQUEST",
    UNKNOWN = "UNKNOWN",
}

let ResultCodes: ResultCode[] = Object.keys(ResultCode).map(k => k as ResultCode)

let ResultCodeMap: { [key in keyof typeof ResultCode]: ColorSelectionOption } = {
    OK: {
        "name": "成功",
        "value": "OK",
        "color": Color.PRIMARY,
    },
    LOGIN: {
        "name": "没有登录，禁止访问",
        "value": "LOGIN",
        "color": Color.PRIMARY,
    },
    NOT_FOUND: {
        "name": "资源不存在",
        "value": "NOT_FOUND",
        "color": Color.PRIMARY,
    },
    BAD_REQUEST: {
        "name": "请求不合法",
        "value": "BAD_REQUEST",
        "color": Color.PRIMARY,
    },
    UNKNOWN: {
        "name": "服务器未知错误",
        "value": "UNKNOWN",
        "color": Color.PRIMARY,
    },
}

let ResultCodeList: ColorSelectionOption[] = []
ResultCodes.forEach((type: ResultCode, index: number) => {
    ResultCodeList.push(ResultCodeMap[type])
})


export {ResultCode, ResultCodes, ResultCodeMap, ResultCodeList}




