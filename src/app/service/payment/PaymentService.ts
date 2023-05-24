import BaseService from "../base/BaseService";

export default class PaymentService extends BaseService {

    static URL_PAID_CALLBACK = "/api/payment/paid/callback"

    /**
     * 支付订单
     */
    public static async httpPaidCallback(orderNo: string): Promise<void> {

        await BaseService.httpPost(PaymentService.URL_PAID_CALLBACK, {orderNo: orderNo})

    }


}