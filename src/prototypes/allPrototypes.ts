import Vue from 'vue'

// 全局input 禁止输入特殊字符方法
Vue.prototype.$validForbid = function (data: any) {
    return data.
    replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
}

// input身份证脱敏
Vue.prototype.$idCardValid = function (data: any) {
    return data.
    replace(/^(\d{6})\d+(\d{4})$/, "$1******$2");
}
