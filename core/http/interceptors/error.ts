export function error(err: unknown) {
    // eslint-disable-next-line no-console
    console.log('interceptor err', err);

    return Promise.reject(err);
}