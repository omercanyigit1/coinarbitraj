import { RequestConfig } from '@/core/http/types/request-config';

export function request(config: RequestConfig): Promise<RequestConfig> {
    // eslint-disable-next-line no-console
    console.log('interceptor request', config);

    if (config.oauth) {
        const tokenStr = 'j4sASDASDasdasasdad43DD3efsdf';

        config.headers = {
            ...config.headers,
            oauth: config.oauth,
            token: `Bearer ${tokenStr}`
        };
    }

    return new Promise((resolve) => {
        resolve(config);
    });
}