import moment from "moment"
import dayjs from 'dayjs';

export default class DateUtil {

    static DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss";
    static DEFAULT_MINUTE_FORMAT = "YYYY-MM-DD HH:mm";
    static DEFAULT_HOUR_FORMAT = "YYYY-MM-DD HH";

    static SLASH_DATE_FORMAT = "YYYY/MM/DD";

    static TIME_FORMAT = "HH:mm:ss";
    static HOUR_MINUTE_FORMAT = "HH:mm";
    static DATE_FORMAT = "YYYY-MM-DD";
    //紧凑型的时间格式
    static COMPACT_DATE_FORMAT = "YYYYMMDD";
    static DATE_MINUTE_FORMAT = "YYYYMMDDHHmm";

    static simpleDateTime(date: Date | null): string {
        if (date == null) {
            return ""
        } else {
            return moment(date).format(DateUtil.DEFAULT_FORMAT)
        }
    }

    static simpleDate(date: Date | null): string {

        if (date == null) {
            return ""
        } else {
            return moment(date).format(DateUtil.DATE_FORMAT)
        }
    }

    /**
     * 某个日期的前一天
     */
    static lastDay(date: Date | null, format?: string): string {

        if (format === undefined) {
            format = DateUtil.DEFAULT_FORMAT
        }

        if (date == null) {
            return ""
        } else {
            return moment(date).add(-1, 'days').format(format)
        }
    }

    /**
     * 某个日期的前一天,间隔interval为分钟
     */
    static dateAddByMinute(date: Date, interval: number, format?: string): string {

        if (format === undefined) {
            format = DateUtil.DEFAULT_FORMAT
        }
        let newDate: string = moment(date).add(interval, 'm').format(format);

        return newDate;
    }

    /**
     * 日期加法，单位天。
     */
    static dateAddByDay(date: Date, interval: number): Date {
        return dayjs(date).add(interval, 'day').toDate();
    }


    /**
     * 按照指定格式进行格式化
     */
    static format(date: Date | null, formatString: string): string {
        if (date == null) {
            return ""
        } else {
            return moment(date).format(formatString)
        }
    }


    /**
     * 按照指定格式进行格式化
     */
    static formatMoment(date: moment.Moment | null, formatString: string): string | null {
        if (date == null) {
            return null
        } else {
            return date.format(formatString)
        }
    }


    /**
     * 将字符串，按照指定的格式反序列化成为时间对象
     * @param str
     * @param format 格式
     */
    static parse(str: string, format?: string): Date | null {

        if (format !== undefined) {
            let valid = moment(str, format).isValid();
            if (valid) {
                return moment(str, format).toDate()
            } else {
                return null
            }
        } else {
            let m = moment(str)
            if (m) {
                return m.toDate();
            } else {
                return null
            }
        }

    }

    /**
     * 将字符串，按照指定的格式反序列化成为时间对象
     * @param str
     * @param format 格式
     */
    static parseMoment(str: string | null, format?: string): moment.Moment | null {

        if (str === null) {
            return null
        }

        console.log("开始格式化", str, format)
        if (format !== undefined) {
            let valid = moment(str, format).isValid();
            if (valid) {
                return moment(str, format)
            } else {
                return null
            }
        } else {
            let m = moment(str)
            if (m) {
                return m;
            } else {
                return null
            }

        }

    }


    //将时间字符串转化成js date
    //deprecated,使用 parse方法替代。
    static str2Date(str: any): Date {

        let valid = moment(str).isValid();
        if (valid) {
            return moment(str).toDate()
        } else {
            //console.warn("不能转换成时间对象:", str)
            return new Date()
        }
    }

    //获取起始时间和结束时间之间的差值，单位是s
    static dateDiff(start: any, end: any): number {
        return moment(end).diff(moment(start), 'seconds')
    }

    /**
     * JS日期系列：根据出生日期 birthday是js时间对象
     */
    static dateAge(birthday) {

        if (birthday) {
            let now = new Date();

            let age = now.getFullYear() - birthday.getFullYear()

            //没有满的话就减一岁。
            if (now.getMonth() < birthday.getMonth()) {
                return age - 1;
            } else {
                return age
            }

        } else {
            return "";
        }
    }

}
