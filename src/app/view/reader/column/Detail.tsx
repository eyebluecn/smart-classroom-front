import './Detail.less'
import {useRequest} from "ahooks";
import ColumnService from "../../../service/column/ColumnService";
import Column from "../../../model/column/Column";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button} from "antd";
import CommonError from "../../../model/base/error/CommonError";
import MessageBoxUtil from "../../../utility/MessageBoxUtil";


function Detail() {

    let [column, setColumn] = useState(new Column());

    let {columnId} = useParams();

    const {loading, run} = useRequest(ColumnService.httpDetail, {
        manual: true,
        debounceWait: 100,
        onSuccess: (result: Column, params: [number]) => {
            setColumn(result)
        },
        onError: (e: CommonError, params: [number]) => {
            MessageBoxUtil.error(e.message)
        }
    });

    useEffect(() => {
        run(parseInt(columnId))
    }, [columnId])

    return (
        <div className={"page-column-detail"}>
            <h1>欢迎来到专栏详情页</h1>
            <Button loading={loading} onClick={() => {
                run(parseInt(columnId))
            }}>刷新</Button>
            <h2>专栏名称：{column.name}</h2>
        </div>
    )
}

export default Detail
