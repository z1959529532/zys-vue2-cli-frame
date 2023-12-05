import axios from 'axios';
import router from '../router/index';
import store from '../store/index';
import {Message} from 'element-ui';

let baseUrl = '';
switch (process.env.NODE_ENV) {
    case 'development':  //开发环境
        // baseUrl = process.env.VUE_APP_DEV_API;
        baseUrl = '/zysDevApi';
        break;
    case 'production':  //生产环境
        baseUrl = '/zysDevApi';
        break;
}

const service = axios.create({
    baseURL: baseUrl,
    timeout: 6000,
    method: 'GET',
    headers: {
        // 默认
        'Content-Type': 'application/json'
    }
});
// 设置post请求头
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const waitToastTime = 1000;
const tip = msg => {
    // Toast({
    //     message: msg,
    //     duration: waitToastTime,
    //     forbidClick: true
    // });
}

// 请求拦截器
service.interceptors.request.use(config => {
    // const token = store.state.token;
    // token && (config.headers.Authorization = token)
    config.headers.Authorization = localStorage.getItem('token');
    return config
}, error => {
    return Promise.error(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
    // response.setHeader("Set-Cookie","CookieName=CookieValue;SameSite=propValue");
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
}, error => {
    // 请求失败
    const {errResponse} = error;
    if (errResponse) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(errResponse.status, errResponse.data.message);
        return Promise.reject(errResponse);
    } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        if (!window.navigator.onLine) {
            // 断网
            Message.error('请检查网络连接！');
            // store.commit('changeNetwork', false);
        } else {
            if (axios.isCancel(error)) {
                // 用户手动取消
                console.log('手动取消请求。。。');
            } else {
                // 返回true
                Message.error('连接服务器错误！');
                return Promise.reject(error);
            }
        }
    }
});

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            // store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, waitToastTime);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}

/**
 * 跳转登录页
 * 携带当前页面路由，在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

export default service;
