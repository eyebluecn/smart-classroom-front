import './List.less'
import {useRequest} from "ahooks";
import {useEffect, useState} from "react";
import {Button, Table, Tag} from "antd";
import CommonError from "../../../model/base/error/CommonError";
import MessageBoxUtil from "../../../utility/MessageBoxUtil";
import Pager from "../../../model/base/Pager";
import DateUtil from "../../../utility/DateUtil";
import {ResultCode} from "../../../model/base/result/ResultCode";
import {useNavigate} from "react-router-dom";
import RichSubscription from "../../../model/subscription/RichSubscription";
import PaymentService from "../../../service/payment/PaymentService";
import SubscriptionService from "../../../service/subscription/SubscriptionService";
import PrepareSubscribe from "../../../model/subscription/PrepareSubscribe";
import TitleNavigation from "../../common/component/TitleNavigation";
import {TablePaginationConfig} from "antd/es/table/interface";

function List() {

    let [pager, setPager] = useState(new Pager<RichSubscription>(RichSubscription));

    const navigate = useNavigate();

    const pagerRequest = useRequest(SubscriptionService.httpPage, {
        manual: true,
        debounceWait: 100,
        onSuccess: (result: Pager<RichSubscription>, params: any) => {
            setPager(result)
        },
        onError: (e: CommonError, params: any) => {
            MessageBoxUtil.error(e.message)
            if (e.code === ResultCode.LOGIN) {
                console.log('将自动转跳')
                navigate('/reader/login');
            }
        }
    });


    useEffect(() => {
        pagerRequest.run(pager.getParams())
    }, [])


    let columns: any = [{
        title: "ID",
        dataIndex: "id",
        render: (text: any, record: RichSubscription, index: number) => {
            return <div>{record.subscription.id}</div>
        }
    }, {
        title: "专栏名称",
        dataIndex: "name",
        render: (text: any, record: RichSubscription, index: number) => {
            return <div>{record.column.name}</div>
        }
    }, {
        title: "价格",
        dataIndex: "price",
        render: (text: any, record: RichSubscription, index: number) => {
            return <div>￥{record.order.price / 100}</div>
        }
    },  {
        title: "订阅时间",
        dataIndex: "time",
        render: (text: any, record: RichSubscription, index: number) => {
            return <div>{DateUtil.simpleDateTime(record.subscription.createTime)}</div>
        }
    }]

    return (
        <div className={"page-subscription-list"}>

            <TitleNavigation name={'我订阅的专栏'}/>

            <div className={'text-right mb10'}>
                <Button loading={pagerRequest.loading} type={'primary'} onClick={() => {
                    pagerRequest.run(pager.getParams())
                }}>刷新</Button>
            </div>

            <Table<RichSubscription>
                rowKey={(item: RichSubscription) => {
                    return item.subscription.id!
                }}
                loading={pagerRequest.loading}
                dataSource={pager.data}
                columns={columns}
                pagination={pager.getPagination()}
                onChange={(pagination: TablePaginationConfig) => {

                    pager.setPagination(pagination)
                    pagerRequest.run(pager.getParams())
                }}
            />

        </div>
    )
}

export default List
