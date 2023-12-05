/**
 * url静态类装饰器
 *
 * @author zys
 * @since 2021/11/8 9:53
 */
// import request from './request';

export function UrlPrefix(prefix?: string[]) {
    // return <T extends object>(target: T) => new Proxy<T>(target, {
    //     get(t, k) {
    //         let prefixStr = '';
    //         if (prefix && prefix?.length > 0) {
    //             prefixStr += (prefix.join('/') + '/');
    //         }
    //         if (t[k]?.indexOf('ws://') >= 0) {
    //             return t[k].replace('ws://', request.defaults.baseURL.replace('http', 'ws'));
    //         }
    //
    //         return request.defaults.baseURL + prefixStr + t[k];
    //     }
    // });
}
