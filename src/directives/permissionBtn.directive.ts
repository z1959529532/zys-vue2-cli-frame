import {DirectiveBinding} from "vue/types/options";
import {TypeUtil} from "@/utils/type.util";

/**
 * 检查权限
 * @param key
 */
function checkArray(key: string | string[]) {
    // const arr = ['admin', 'user'];
    const type = TypeUtil.getType(key);
    if (type == 'String') {
        return key == localStorage.getItem('role');
    }
    if (type == 'Array') {
        const index = key.indexOf(localStorage.getItem('role') as string);
        return index > -1;
    }
    return true;
}

const permissionBtnDirective = {
    inserted(el: HTMLElement, binding: DirectiveBinding) {
        const perValue = binding.value;  // 获取绑定值
        if (permissionBtnDirective) {
            const hasPermission = checkArray(perValue);
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
};
export default permissionBtnDirective;
