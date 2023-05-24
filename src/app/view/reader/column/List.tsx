import './Detail.less'
import {useRequest} from "ahooks";
import ColumnService from "../../../service/column/ColumnService";
import React, {useEffect, useState} from "react";
import {Alert, Button, Table, Tag} from "antd";
import CommonError from "../../../model/base/error/CommonError";
import MessageBoxUtil from "../../../utility/MessageBoxUtil";
import Pager from "../../../model/base/Pager";
import DateUtil from "../../../utility/DateUtil";
import {ResultCode} from "../../../model/base/result/ResultCode";
import {useNavigate} from "react-router-dom";
import RichColumn from "../../../model/column/RichColumn";
import PaymentService from "../../../service/payment/PaymentService";
import SubscriptionService from "../../../service/subscription/SubscriptionService";
import PrepareSubscribe from "../../../model/subscription/PrepareSubscribe";
import TitleNavigation from "../../common/component/TitleNavigation";
import {TablePaginationConfig} from "antd/es/table/interface";
import {SyncOutlined} from "@ant-design/icons";

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
                navigate('/reader/login');
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
                navigate('/reader/subscription/list')
            }, 1000)
        },
        onError: (e: CommonError, params: any) => {
            setSubscribing(false)
            MessageBoxUtil.error(e.message)
            if (e.code === ResultCode.LOGIN) {
                console.log('将自动转跳')
                navigate('/reader/login');
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
        title: "是否已订阅",
        dataIndex: "authorName",
        render: (text: any, record: RichColumn, index: number) => {
            if (record.subscription.id) {
                return <Tag color={'success'}>已订阅</Tag>
            } else {
                return <Tag color={'magenta'}>未订阅</Tag>
            }
        }
    }, {
        title: "创建日期",
        dataIndex: "name",
        render: (text: any, record: RichColumn, index: number) => {
            return <div>{DateUtil.simpleDateTime(record.column.createTime)}</div>
        }
    }, {
        title: "操作",
        render: (text: any, record: RichColumn, index: number) => {
            return <div>
                {
                    !record.subscription.id && (
                        <Button type={'primary'} size={'small'}
                                disabled={subscribing}
                                onClick={() => {
                                    setSubscribing(true)
                                    prepareRequest.run(record.column.id)
                                }}>订阅</Button>
                    )
                }
            </div>
        }
    }]

    return (
        <div className={"page-column-list"}>

            <TitleNavigation name={'所有专栏'}/>

            <div className={'text-right mb10'}>
                <Button loading={pagerRequest.loading}
                        icon={<SyncOutlined/>} onClick={() => {
                    pagerRequest.run(pager.getParams())
                }}>刷新</Button>
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

            <Alert message="可以切换到小编版中创建专栏" type="info" showIcon />


        </div>
    )
}

export default List
