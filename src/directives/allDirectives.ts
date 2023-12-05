// import Vue from "vue";
import {dialogDrag, modalDrag} from './dragDialog.directive';
import dragDom from './dragDom.directive';
import preventReClick from './preventReClick.directive';
import permissionBtn from "./permissionBtn.directive";
import {lazyLoadImg} from "@/directives/lazyLoadImg";

/**
 * 所有指令
 */
// Vue.directive('dialog-drag', dialogDrag as any);
// Vue.directive('prevent-repeat-click', preventReClick as any);


const directives = {
    "dialog-drag": dialogDrag,
    "drag-dom": dragDom,
    "prevent-repeat-click": preventReClick,
    "permission-btn": permissionBtn,
    lazyLoadImg
}
// Object.keys(directives).forEach(key => {
//     // @ts-ignore
//     Vue.directive(key, directives[key]);
// })

export default {
    // @ts-ignore
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            // @ts-ignore
            Vue.directive(key, directives[key])
        })
    }
}

