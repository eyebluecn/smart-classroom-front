import Column from "../../model/column/Column";
import BaseService from "../base/BaseService";
import Pager from "../../model/base/Pager";
import RichColumn from "../../model/column/RichColumn";

export default class ColumnService extends BaseService {

    static URL_OMNIBUS = "/api/column/omnibus"

    static URL_DETAIL = "/api/column/detail"

    static URL_PAGE = "/api/column/page"

    /**
     * 创建专栏
     */
    public static async httpCreate(authorName: string, columnName: string, columnPrice: number): Promise<Column> {

        let data = await BaseService.httpGet(ColumnService.URL_OMNIBUS, {
            authorName,
            columnName,
            columnPrice
        })

        let column = new Column();
        column.assign(data)

        return column
    }


    /**
     * 获取专栏详情
     */
    public static async httpDetail(id: number): Promise<Column> {

        let data = await BaseService.httpGet(ColumnService.URL_DETAIL, {id: id})

        let column = new Column();
        column.assign(data)

        return column
    }

    /**
     * 获取富专栏列表
     */
    public static async httpPage(params: any): Promise<Pager<RichColumn>> {

        let data = await BaseService.httpPost(ColumnService.URL_PAGE, params)

        let pager = new Pager<RichColumn>(RichColumn);
        pager.assign(data)

        return pager
    }


}