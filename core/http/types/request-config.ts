import { AxiosRequestConfig } from 'axios';

export type RequestConfig = AxiosRequestConfig & {
    oauth?: boolean;
}