import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { statusCodeEnum } from '@/enums/statusCodeEnum'

// 加载环境变量
const { VITE_PROXY_PATH } = import.meta.env;
const HAS_TOKEN = false;

export interface ResultData<T = any> {
    code: number;
    msg: string;
    data?: T;
    [prop: string]: any;
}

class RequestHttp {
    service: AxiosInstance;
    constructor(){
        /* 创建 axios 实例 */
        this.service = axios.create({
            baseURL: VITE_PROXY_PATH,
            timeout: 20000,
            withCredentials: true// 跨域时候允许携带凭证
        })
        this.interceptorsRequest();
        this.interceptorsResponse();
    }
    /* 请求拦截 */
    private interceptorsRequest (){
        this.service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            if (HAS_TOKEN) {// 发送请求的时候，如果有token，需要附带到请求头中
                let headers = config.headers
                headers.authorization = `bearer ${localStorage.getItem("token")}`;
                config.headers = headers;
            }
            if (config.method === 'post' && config.data) {
                config.data = qs.stringify(config.data);// 'application/x-www-form-urlencoded;'
            }
            return config;
        }, (error: any) => {
            return Promise.reject(error);
        });
    }
    /* 响应拦截 */
    private interceptorsResponse (){
        this.service.interceptors.response.use((resp: AxiosResponse) => {
            if (HAS_TOKEN && resp.headers.authorization) {// 响应的时候，如果有token，保存token到客户端
                localStorage.setItem("token", resp.headers.authorization);
            }
            return resp.data;
        }, (error: any) => {
            if (HAS_TOKEN && error.response.status === statusCodeEnum.overdue) {// 响应的时候，如果响应的消息码是403（没有token，token失效），在本地删除token
                localStorage.removeItem("token");
                const message = Reflect.get(window, '$message') || null
                message && message.error(error.response.data?.msg);
            }
            return Promise.reject(error);
        });
    }
    // 常用方法封装
    request<T = any>(config: AxiosRequestConfig): Promise<ResultData<T>>{
        return this.service.request<any, ResultData<T>>(config);
    }
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.get<any, ResultData<T>>(url, config);
    }
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.post<any, ResultData<T>>(url, data, config);
    }
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.put<any, ResultData<T>>(url, data, config);
    }
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.delete<any, ResultData<T>>(url, config);
    }
}

export const http = new RequestHttp()