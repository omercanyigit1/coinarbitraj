import { RequestConfig } from '@/core/http/types/request-config';
import cookies from 'js-cookie';

export function request(config: RequestConfig): Promise<RequestConfig> {

    if (config.oauth) {
        const next_auth_coinarbitage_jwt = cookies.get('next_auth_coinarbitage_jwt');

        config.headers = {
            ...config.headers,
            oauth: config.oauth,
            token: `Bearer ${next_auth_coinarbitage_jwt}`
        };
    }

    return new Promise((resolve) => {
        resolve(config);
    });
}