/**
 * @description api生成方法
 * @author zhengwenjian
 */

import To from './To';
import { AxiosRequestConfig } from 'axios';
import { instance as axios } from './request';

import { proxys } from '../proxys'

export type RequestAxios = (params?: AxiosRequestConfig) => Promise<any>;
export type GenApis<T> = {
    [P in keyof T]: RequestAxios;
};

export const env_key = __ENV__

/** 获取node接口host */
export function nodeRequestUrl(url: string): string {
    if (__isBrowser__) return url
    let host = '', resultUrl = url.startsWith('/') ? url.replace('/', '') : url;
    const findKey = proxys[env_key].keys.find((key: string) => resultUrl.startsWith(key))
    if (findKey) {
        host = proxys[env_key].proxy[findKey]
    }
    return host + url
}

/**
 * 将 obj = { getList: 'POST /getList'}
 * 生成一个以运行getList就直接使用POST请求的方法
 * @param obj 生成apis方法的对象
 */
const genApis = (obj: any) => {
    let apis: any = {};
    for (const key in obj) {
        const arr = obj[key].split(' ');
        const method: any = arr[0]; // 请求方式
        let url: string = nodeRequestUrl(arr[1]); // 请求url
        apis[key] = (sendParams?: AxiosRequestConfig) => {
            return To(
                axios.request({
                    method,
                    url,
                    ...sendParams,
                }),
            );
        };
    }
    return apis;
};

export default genApis;
