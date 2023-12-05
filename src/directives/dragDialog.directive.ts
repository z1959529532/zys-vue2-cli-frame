import {DirectiveBinding} from "vue/types/options";

export const modalDrag = dragDialogDirective('.ant-modal-header', '.ant-modal-content');
export const dialogDrag = dragDialogDirective('.el-dialog__header', '.el-dialog');

/**
 * 弹窗可拖动指令
 * @param headerSelector
 * @param dragSelector
 */
function dragDialogDirective(headerSelector: string, dragSelector: string) {
    return {
        bind(el: HTMLImageElement, binding: DirectiveBinding) {
            const dialogHeaderEl = el.querySelector(headerSelector);
            const dragDom = el.querySelector(dragSelector);
            // @ts-ignore
            const originCursor = dialogHeaderEl.style.cursor;
            // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            // @ts-ignore
            const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

            // @ts-ignore
            dialogHeaderEl.onmousedown = e => {
                // @ts-ignore
                dialogHeaderEl.style.cursor = 'move';
                // 鼠标按下，计算当前元素距离可视区的距离
                // @ts-ignore
                const disX = e.clientX - dialogHeaderEl.offsetLeft;
                // @ts-ignore
                const disY = e.clientY - dialogHeaderEl.offsetTop;

                // 获取到的值带px 正则匹配替换
                // @ts-ignore
                let styL, styT;

                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (sty.left.includes('%')) {
                    styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                    styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
                } else {
                    styL = +sty.left.replace(/\px/g, '');
                    styT = +sty.top.replace(/\px/g, '');
                }

                document.onmousemove = e => {
                    // 通过事件委托，计算移动的距离
                    const l = e.clientX - disX;
                    const t = e.clientY - disY;

                    // 移动当前元素
                    // @ts-ignore
                    dragDom.style.left = `${l + styL}px`;
                    // @ts-ignore
                    dragDom.style.top = `${t + styT}px`;

                    //将此时的位置传出去
                    // binding.value({x: e.pageX, y: e.pageY});
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    // @ts-ignore
                    dialogHeaderEl.style.cursor = originCursor;
                };
            };
        }
    }
}

// Vue.directive('dialog-drag', {
//     // @ts-ignore
//     bind(el: HTMLImageElement, binding: DirectiveBinding) {
//         const dialogHeaderEl = el.querySelector('.el-dialog__header');
//         const dragDom = el.querySelector('.el-dialog');
//         // @ts-ignore
//         const originCursor = dialogHeaderEl.style.cursor;
//         // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
//         // @ts-ignore
//         const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
//
//         // @ts-ignore
//         dialogHeaderEl.onmousedown = e => {
//             // @ts-ignore
//             dialogHeaderEl.style.cursor = 'move';
//             // 鼠标按下，计算当前元素距离可视区的距离
//             // @ts-ignore
//             const disX = e.clientX - dialogHeaderEl.offsetLeft;
//             // @ts-ignore
//             const disY = e.clientY - dialogHeaderEl.offsetTop;
//
//             // 获取到的值带px 正则匹配替换
//             let styL: any, styT: any;
//
//             // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
//             if (sty.left.includes('%')) {
//                 styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
//                 styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
//             } else {
//                 styL = +sty.left.replace(/\px/g, '');
//                 styT = +sty.top.replace(/\px/g, '');
//             }
//
//             document.onmousemove = e => {
//                 // 通过事件委托，计算移动的距离
//                 const l = e.clientX - disX;
//                 const t = e.clientY - disY;
//
//                 // 移动当前元素
//                 // @ts-ignore
//                 dragDom.style.left = `${l + styL}px`;
//                 // @ts-ignore
//                 dragDom.style.top = `${t + styT}px`;
//
//                 //将此时的位置传出去
//                 binding.value({x: e.pageX, y: e.pageY});
//             };
//
//             document.onmouseup = () => {
//                 document.onmousemove = null;
//                 document.onmouseup = null;
//                 // @ts-ignore
//                 dialogHeaderEl.style.cursor = originCursor;
//             };
//         };
//     }
// });
