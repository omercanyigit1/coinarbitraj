import axios from 'axios';

import { error } from '@/core/http/interceptors/error';
import { request } from '@/core/http/interceptors/request';
import { response } from '@/core/http/interceptors/response';
import { RequestConfig } from '@/core/http/types/request-config';

const axiosInstance = axios.create({
    baseURL: 'https://coinarbitrage.io/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(request, error);
axiosInstance.interceptors.response.use(response, error);

export default class Http {
    public static get(url: string, config?: RequestConfig) {
        return axiosInstance.get(url, config);
    }

    public static post(url: string, data?: unknown, config?: RequestConfig) {
        return axiosInstance.post(url, data, config);
    }

    public static put(url: string, data?: unknown, config?: RequestConfig) {
        return axiosInstance.put(url, data, config);
    }

    public static patch(url: string, data?: unknown, config?: RequestConfig) {
        return axiosInstance.patch(url, data, config);
    }
}