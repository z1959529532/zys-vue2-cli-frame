import Vue from "vue";
import {DirectiveBinding} from "vue/types/options";

Vue.directive('lazyLoadImg', {
    inserted(el: HTMLElement, binding: DirectiveBinding) {
        // 有绑定值，不做懒加载处理
        if (binding.value != undefined && !binding.value) return;
        // 通过 data-src 属性获取图片地址
        const imgSrc = el.getAttribute('data-src');
        // 监听元素是否出现在可视区域内
        const observer = new IntersectionObserver(([{isIntersecting}]) => {
            if (isIntersecting) {
                // 加载图片
                (el as any).src = require(`@assets/${imgSrc}`);
                // 停止监听
                observer.unobserve(el);
            }
        });
        // 开启监听，传入dom
        observer.observe(el);
    }
});

export const lazyLoadImg = {
    inserted(el: HTMLElement, binding: DirectiveBinding) {
        if (binding.value != undefined && !binding.value) return;
        const imgSrc = el.getAttribute('data-src');
        const observer = new IntersectionObserver(([{isIntersecting}]) => {
            if (isIntersecting) {
                (el as any).src = require(`@assets/${imgSrc}`);
                observer.unobserve(el);
            }
        });
        observer.observe(el);
    }
}
