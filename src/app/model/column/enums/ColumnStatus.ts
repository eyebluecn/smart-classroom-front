import ColorSelectionOption from "../../base/option/ColorSelectionOption";
import Color from "../../base/option/Color";

enum ColumnStatus {
    NEW = "NEW",
    OK = "OK",
    DISABLED = "DISABLED",
}

let ColumnStatuses: ColumnStatus[] = Object.keys(ColumnStatus).map(k => k as ColumnStatus)

let ColumnStatusMap: { [key in keyof typeof ColumnStatus]: ColorSelectionOption } = {
    NEW: {
        "name": "未发布",
        "value": "NEW",
        "color": Color.WARNING,
    },
    OK: {
        "name": "已发布",
        "value": "OK",
        "color": Color.SUCCESS,
    },
    DISABLED: {
        "name": "被禁用",
        "value": "DISABLED",
        "color": Color.DANGER,
    },
}

let ColumnStatusList: ColorSelectionOption[] = []
ColumnStatuses.forEach((type: ColumnStatus, index: number) => {
    ColumnStatusList.push(ColumnStatusMap[type])
})


export {ColumnStatus, ColumnStatuses, ColumnStatusMap, ColumnStatusList}




