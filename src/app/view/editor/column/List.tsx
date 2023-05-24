import './Create.less'
import {useRequest} from "ahooks";
import ColumnService from "../../../service/column/ColumnService";
import {useEffect, useState} from "react";
import {Button, Space, Table} from "antd";
import CommonError from "../../../model/base/error/CommonError";
import MessageBoxUtil from "../../../utility/MessageBoxUtil";
import Pager from "../../../model/base/Pager";
import DateUtil from "../../../utility/DateUtil";
import {ResultCode} from "../../../model/base/result/ResultCode";
import {Link, useNavigate} from "react-router-dom";
import RichColumn from "../../../model/column/RichColumn";
import PaymentService from "../../../service/payment/PaymentService";
import SubscriptionService from "../../../service/subscription/SubscriptionService";
import PrepareSubscribe from "../../../model/subscription/PrepareSubscribe";
import TitleNavigation from "../../common/component/TitleNavigation";
import {TablePaginationConfig} from "antd/es/table/interface";
import {SendOutlined, SyncOutlined} from "@ant-design/icons";

function List() {

    let [subscribing, setSubscribing] = useState(false);
    let [pager, setPager] = useState(new Pager<RichColumn>(RichColumn));

    const navigate = useNavigate();

    const pagerRequest = useRequest(ColumnService.httpPage, {
        manual: true,
        debounceWait: 100,
        onSuccess: (result: Pager<RichColumn>, params: any) => {
            setPager(result)
        },
        onError: (e: CommonError, params: any) => {
            MessageBoxUtil.error(e.message)
            if (e.code === ResultCode.LOGIN) {
                console.log('将自动转跳')
                navigate('/editor/login');
            }
        }
    });


    const paymentRequest = useRequest(PaymentService.httpPaidCallback, {
        manual: true,
        debounceWait: 100,
        onSuccess: (result: void, params: any) => {
            MessageBoxUtil.success("模拟支付成功")
            setTimeout(() => {
                setSubscribing(false)
                navigate('/editor/subscription/list')
            }, 1000)
        },
        onError: (e: CommonError, params: any) => {
            setSubscribing(false)
            MessageBoxUtil.error(e.message)
            if (e.code === ResultCode.LOGIN) {
                console.log('将自动转跳')
                navigate('/editor/login');
            }
        }
    });


    const prepareRequest = useRequest(SubscriptionService.httpPrepare, {
        manual: true,
        debounceWait: 100,
        onSuccess: (result: PrepareSubscribe, params: any) => {

            MessageBoxUtil.success("下单成功，准备模拟支付")

            console.log("下单成功", result)

            setTimeout(() => {

                paymentRequest.run(result.orderDTO.no)

            }, 2000)
        },
        onError: (e: CommonError, params: any) => {
            setSubscribing(false)
            MessageBoxUtil.error(e.message)
            if (e.code === ResultCode.LOGIN) {
                console.log('将自动转跳')
                navigate('/editor/login');
            }
        }
    });


    useEffect(() => {
        pagerRequest.run(pager.getParams())
    }, [])


    let columns: any = [{
        title: "ID",
        dataIndex: "id",
        render: (text: any, record: RichColumn, index: number) => {
            return <div>{record.column.id}</div>
        }
    }, {
        title: "名称",
        dataIndex: "name",
        render: (text: any, record: RichColumn, index: number) => {
            return <div>{record.column.name}</div>
        }
    }, {
        title: "作者",
        dataIndex: "authorName",
        render: (text: any, record: RichColumn, index: number) => {
            return <div>{record.author.username}</div>
        }
    }, {
        title: "价格",
        dataIndex: "authorName",
        render: (text: any, record: RichColumn, index: number) => {
            return <div>￥{record.columnQuote.price / 100}</div>
        }
    }, {
        title: "创建日期",
        dataIndex: "name",
        render: (text: any, record: RichColumn, index: number) => {
            return <div>{DateUtil.simpleDateTime(record.column.createTime)}</div>
        }
    }]

    return (
        <div className={"page-column-list"}>

            <TitleNavigation name={'所有专栏'}/>

            <div className={'text-right mb10'}>
                <Space>
                    <Link to={'/editor/column/create'}>
                        <Button
                            type={'primary'}
                            icon={<SendOutlined/>}
                        >新建专栏</Button>
                    </Link>

                    <Button loading={pagerRequest.loading}
                            icon={<SyncOutlined/>}
                            onClick={() => {
                                pagerRequest.run(pager.getParams())
                            }}>刷新</Button>
                </Space>

            </div>

            <Table<RichColumn>
                rowKey={(item: RichColumn) => {
                    return item.column.id
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
