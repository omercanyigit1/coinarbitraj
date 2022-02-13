import Http from '@/core/http';
import { IUserService, UserEndpoints } from '@/services';

const UserService: IUserService = {
    login: (): Promise<unknown> => {
        return Promise.resolve(Http.post(UserEndpoints.Login, { email: '', password: '' }));
    },

    register: (): Promise<unknown> => {
        return Promise.resolve(Http.post(UserEndpoints.Login, { email: '', name: '', password: '', surname: '' }));
    }
};

Object.freeze(UserService);

export default UserService;