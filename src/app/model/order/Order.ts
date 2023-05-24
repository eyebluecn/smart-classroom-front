import BaseEntity from "../base/BaseEntity";


export default class Order extends BaseEntity {


    /**
     * 订单唯一编号，整个系统唯一，带有前缀
     */
    no: string | null = null;

    /**
     * 读者id
     */
    readerId: number | null = null;

    /**
     * 专栏id
     */
    columnId: number | null = null;

    /**
     * 专栏报价id
     */
    columnQuoteId: number | null = null;

    /**
     * 支付单id
     */
    paymentId: number | null = null;

    /**
     * 价格（单位：分）
     */
    price: number | null = null;

    /**
     * 状态 CREATED/PAID/SUBSCRIBED/CLOSED/CANCELED
     */
    status: string | null = null;

    constructor() {
        super()
    }

    assign(obj: any) {
        super.assign(obj)

    }

}