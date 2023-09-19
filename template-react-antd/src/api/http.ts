import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import Qs from 'qs'
import { message } from 'antd'

export interface Result {
    code: number
    msg: string
}
export interface ResultData<T = any> extends Result {
    data?: T
}

class RequestHttp {
    service: AxiosInstance;
    constructor() {
        /**
         * 创建 axios 实例
         */
        this.service = axios.create({
            baseURL: '',
            timeout: 20000,
            withCredentials: true// 跨域时候允许携带凭证
        })
        /**
         * 请求拦截
         */
        this.service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            let data = config.data;
            if(config.method === 'post'){
                // axios 自动修改请求头里的 content-type 为 application/x-www-form-urlencoded
                data = Qs.stringify(data)
            }
            // 发送请求的时候，如果有token，需要附带到请求头中
            // const token = ''
            // headers.authorization = `bearer ${token}`
            return {
                ...config,
                data
            }
        }, (error: AxiosError) => {
            return Promise.reject(error);
        })
        /**
         * 响应拦截
         */
        this.service.interceptors.response.use((resp: AxiosResponse) => {

            return resp.data;
        }, (error: AxiosError) => {
            const { response } = error;
            // 处理403的情况
            console.log(response)
            if(response?.status === 403){
                message.error((response.data as ResultData)?.msg, 1000)
            }
            return Promise.reject(error);
        })
    }

    // 常用方法封装
    request(config: AxiosRequestConfig<any>): Promise<ResultData<any>>{
        return this.service.request(config);
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

export const http = new RequestHttp();