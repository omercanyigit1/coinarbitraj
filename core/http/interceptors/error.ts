import { AxiosError } from 'axios';

export function error(err: AxiosError) {
    // eslint-disable-next-line no-console
    console.log('interceptor err', err.message);

    return Promise.reject(err);
}