import Vue from 'vue'

/**
 * ts代码不识别的声明
 */
declare module 'vue/types/vue' {
    interface Vue {
        $validForbid: any
    }
}