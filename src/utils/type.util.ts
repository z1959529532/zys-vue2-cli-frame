/**
 * 数据类型工具类
 *
 * @author zys
 * @since 2022/9/19 20:17
 */
export class TypeUtil {

    /**
     * 判断数据类型
     * @param obj 传入数据
     */
    static getType(obj: any) {
        return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
    }

    /**
     * 判断对象是否为空对象
     * @param obj 传入数据
     */
    static isEmptyObject(obj: Object) {
        if (TypeUtil.getType(obj) === 'object') {
            // JSON.stringify(obj) == '{}';
            return Object.keys(obj).length == 0;
        }
    }
}