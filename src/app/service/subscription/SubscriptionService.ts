import BaseService from "../base/BaseService";
import PrepareSubscribe from "../../model/subscription/PrepareSubscribe";
import Pager from "../../model/base/Pager";
import RichSubscription from "../../model/subscription/RichSubscription";

export default class SubscriptionService extends BaseService {

    static URL_PREPARE = "/api/subscription/prepare"
    static URL_PAGE = "/api/subscription/page"

    /**
     * 获取专栏详情
     */
    public static async httpPrepare(columnId: number): Promise<PrepareSubscribe> {

        let data = await BaseService.httpPost(SubscriptionService.URL_PREPARE, {
            columnId: columnId,
            payMethod: "ALIPAY"
        })

        let prepareSubscribe = new PrepareSubscribe();
        prepareSubscribe.assign(data)

        return prepareSubscribe
    }

    /**
     * 获取富订阅列表
     */
    public static async httpPage(params: any): Promise<Pager<RichSubscription>> {

        let data = await BaseService.httpPost(SubscriptionService.URL_PAGE, params)

        let pager = new Pager<RichSubscription>(RichSubscription);
        pager.assign(data)

        console.log("来了", pager)
        return pager
    }


}