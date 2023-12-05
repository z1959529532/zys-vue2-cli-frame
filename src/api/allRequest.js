import request from '@/api/request';
// import request from '../request';
import qs from 'qs';
import {CancelToken} from "axios";

/**********************************************模块**********************************************/
/**
 * 登录验证
 * @param params
 */
const userLogin = (params) => {
    return request({
        url: '/login',
        method: 'POST',
        data: params,
    });
};

/**
 * 验证用户
 * @param params
 * @returns {*}
 */
const userValidate = (params) => {
    return request({
        url: '/validate',
        data: params
    });
}

const getUsers = (params, sourceToken) => {
    return request({
        url: '/getUsers',
        params,
        cancelToken: sourceToken
    });
}

export default {
    userLogin,
    userValidate,
    getUsers
}
