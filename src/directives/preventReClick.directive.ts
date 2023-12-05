import {DirectiveBinding} from "vue/types/options";

/**
 * 按钮阻止连续点击
 */
const preventReClick = {
    // @ts-ignore
    inserted(el: HTMLElement, binding: DirectiveBinding) {
        el.addEventListener('click', () => {
            // @ts-ignore
            if (!el.disabled) {
                // @ts-ignore
                el.disabled = true;
                setTimeout(() => {
                    // @ts-ignore
                    el.disabled = false;
                }, 2000);
            }
        });
    }
}

export default preventReClick;
