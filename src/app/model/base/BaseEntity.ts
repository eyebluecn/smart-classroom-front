/**
 * 实体基类
 * 继承这个类的表示在数据库中有对应的表。
 */
import Base from "./Base";


export default class BaseEntity extends Base {

    /**
     * 主键
     */
    id: number | null = null;

    /**
     * 创建时间
     */
    createTime: Date = new Date();
    /**
     * 修改时间
     */
    updateTime: Date = new Date();

    //把obj中的属性，赋值到this中来。采用深拷贝。
    assign(obj: any) {
        super.assign(obj)

        this.assignEntity("createTime", Date)
        this.assignEntity("updateTime", Date)

    }

}




