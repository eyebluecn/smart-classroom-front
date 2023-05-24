
/**
 * 请求的Map，键值对
 */
export type RequestParamMap = { [key: string]: string }
/**
 * 字符串或者空
 */
export type StringNull = string | null
/**
 * 多个数据服务的入参，key为proteinCode，value为入参值
 */
export type MultiRequestParamMap = { [key: string]: RequestParamMap }

/**
 * 任务类型的函数
 */
export type TaskFunction = (innerSuccessCallback: () => void, innerErrorCallback: (innerErrorMsg: string) => void) => void;

/**
 * 简单方法
 */
export type SimpleFunction = () => void
