import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Qs from 'qs';

// 加载环境变量
const { VITE_PROXY_PATH, VITE_ENV } = import.meta.env;

export interface Result {
    code: number
    msg: string
}

export interface ResultData<T = any> extends Result {
    data?: T
}

export enum RequestEnums {
    TIMEOUT = 20000,// 超时时间
    SUCCESS = 0,// 成功响应
    OVERDUE = 403// 令牌过期
}

class RequestHttp {
    service: AxiosInstance;
    constructor(){
        /**
         * 创建 axios 实例
         */
        this.service = axios.create({
            baseURL: VITE_PROXY_PATH,
            timeout: RequestEnums.TIMEOUT,
            withCredentials: true// 跨域时候允许携带凭证
        })
        /**
         * 请求拦截
         */
        this.service.interceptors.request.use((config: AxiosRequestConfig) => {
            let data = config.data;
            if(config.method === 'post'){
                data = Qs.stringify(data);
            }
            return {
                ...config,
                data
            }
        },error => {
            return Promise.reject(error);
        })
        /**
         * 响应拦截
         */
        this.service.interceptors.response.use((resp: AxiosResponse) => {
            return resp.data;
        },error => {
            // 响应的时候，如果响应的消息码是403（没有token，token失效）
            if (error.response.status === RequestEnums.OVERDUE) {
                const message = Reflect.get(window, '$message') || null
                message && message.error(error.response.data?.msg);
            }
            return Promise.reject(error);
        })
    }

    // 常用方法封装
    request(config: AxiosRequestConfig<any>): Promise<ResultData<any>>{
        return this.service.request(config)
    }
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.get(url, config);
    }
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.post(url, data, config);
    }
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.put(url, data, config);
    }
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.delete(url, config);
    }
}

export const http = new RequestHttp()