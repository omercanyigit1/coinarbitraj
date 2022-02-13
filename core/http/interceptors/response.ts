import { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function response(resp: AxiosResponse<any>): Promise<AxiosResponse<any>> {
    // eslint-disable-next-line no-console
    console.log('interceptor response', response);

    const cond = true;

    /**
     * servis status error durumunda da 200 ok dönebilir
     * bu gibi durumlarda response kısmından reject ile ilgili providera hata gönderebiliriz
     */
    return new Promise((resolve, reject) => {
        if (cond) { // test amaçlı condition
            resolve(resp);
        }

        reject(response);
    });
}