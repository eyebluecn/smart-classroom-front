import {TablePaginationConfig} from 'antd/lib/table';
import Base from "./Base";
import BrowserUtil from "../../utility/BrowserUtil";
import NumberUtil from "../../utility/NumberUtil";

/**
 * 一个分页帮助器，可以去后台请求数据，也可以渲染需要数据源。
 * 这个类具有非常神奇的能力，可以说是整个项目含金量最高的一个类！
 */
export default class Pager<T> extends Base {

    static MAX_PAGE_SIZE = 1000;

    /**
     * 当前分页大小 1基
     */
    pageNum: number = 1;
    /**
     * 每一页的大小
     */
    pageSize: number = 10;
    /**
     * 总的条目数量
     */
    totalItems: number = 0;
    /**
     * 总的页数
     */
    totalPages: number = 0;

    /**
     * 返回的数据，类型为泛型
     */
    data: T[] = [];

    /**
     * 原汁原味的数据
     */
    rawData: any[] = [];

    /**
     * 类。这个很特殊。
     */
    Clazz: any = null;

    /**
     * 是否要求在浏览器中保存参数
     */
    history: boolean = false;


    constructor(Clazz: any, pageSize = 10) {
        super();

        this.pageSize = pageSize;

        //这里的处理利用了js的原型调用链，比较魔法。
        if (Clazz && (Clazz.prototype instanceof Base)) {
            this.Clazz = Clazz;
        } else {
            console.error('You MUST specify a Clazz extended Base');
        }
    }


    //把obj中的属性，赋值到this中来。采用深拷贝。
    assign(obj: any) {

        super.assign(obj);

        this.assignList('data', this.Clazz);

    }


    //该方法是在地址栏添加上query参数，参数就是filters中的key和value.
    //同时地址栏上有的参数也会自动读取到filters中去
    //因此，启用该方法后返回时可以停留在之前的页码中。
    enableHistory() {
        this.history = true;

        let queryPageNum: string | null = BrowserUtil.getParameterByName('pageNum');
        let queryPageSize: string | null = BrowserUtil.getParameterByName('pageSize');

        if (queryPageNum !== null && queryPageNum !== '') {
            this.pageNum = parseInt(queryPageNum);
        }

        if (queryPageSize !== null && queryPageSize !== '') {
            this.pageSize = parseInt(queryPageSize);
        }

        if (!NumberUtil.isInteger(this.pageNum)) {
            this.pageNum = 1;
        }
        if (!NumberUtil.isInteger(this.pageSize)) {
            this.pageSize = 10;
        }


    }

    //元素是否为空
    isEmpty(): boolean {
        return !this.data || !this.data.length;
    }

    //元素是否为空
    isNotEmpty(): boolean {
        return this.data && this.data.length > 0;
    }

    //从pager中获取当前的分页情况，在table的分页器中显示
    getPagination(): TablePaginationConfig | false {
        let that = this;

        return {
            current: that.pageNum,
            pageSize: that.pageSize,
            total: that.totalItems,
            showTotal: (totalNum: number) => '共' + totalNum + '条',
            showSizeChanger: true,
        };


    }


    //清空所有数据，页码重置1
    clear() {
        this.data = [];
        this.pageNum = 1;
    }


    //获取所有的filter参数，键值对形式
    getParams(): { [s: string]: string | number } {

        let params: { [s: string]: string | number } = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            orderCreateTime: "DESC",
        };

        return params;
    };

    //在table的分页器 发生变化调用
    setPagination(pagination: TablePaginationConfig) {
        let that = this;

        if (pagination.current !== undefined) {
            that.pageNum = pagination.current;
        }

        if (pagination.pageSize !== undefined) {

            that.pageSize = pagination.pageSize;
        }

    }

}




