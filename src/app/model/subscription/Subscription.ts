/**
 * himmr.com Inc. Copyright (c) 2015-present All Rights Reserved.
 * generated by SaberGenerator
 */
import BaseEntity from "../base/BaseEntity";

export default class Subscription extends BaseEntity {

    /**
     * 读者id
     */
    readerId: number | null = null;

    /**
     * 专栏id
     */
    columnId: number | null = null;

    /**
     * 订单id
     */
    orderId: number | null = null;

    /**
     * 状态 CREATED/OK/DISABLED
     */
    status: string | null = null;


    //*****************辅助字段********************//

    constructor() {
        super()
    }

    assign(obj: any) {
        super.assign(obj)

    }

}






