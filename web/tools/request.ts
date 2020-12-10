/**
 * @description 请求实例
 * @author zhengwenjian
 */

import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { store } from './index';

export const instance = axios.create({
    timeout: 20000, // 超时20秒
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true, // 带cookie
});

// http request 拦截
instance.interceptors.request.use(
    config => {
        let token = ''

        if (__isBrowser__) {
            token = store.get('user/info')?.token ?? '';
            if (token) config.headers.token = token;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// http response 拦截器
instance.interceptors.response.use(
    ({ data, status, statusText }: AxiosResponse<any>) => {
        //拦截响应，做统一处理

        // 200 成功请求
        return data;
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        if (error.message === 'Network Error') {
            __isBrowser__ && message.info('Network Error');
        } else {
            __isBrowser__ && message.info('server is busy.');
        }
        return Promise.reject(error.name); // 返回接口返回的错误信息
    },
);
