import Http from '@/core/http';
import { FailedResponse, SuccessResponse, UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from '@/models';
import { IUserService, UserEndpoints } from '@/services';

const UserService: IUserService = {
    login: async (userLoginRequest: UserLoginRequest) => {
        try {
            const { data } = await Http.post(UserEndpoints.Login, { ...userLoginRequest });

            const response = new SuccessResponse<UserLoginResponse>(data);

            return Promise.resolve(response);

        } catch (err) {
            const response = new FailedResponse<UserLoginResponse>(err.code, err.message);

            return Promise.resolve(response);
        }
    },

    register: async (userRegisterRequest: UserRegisterRequest) => {
        try {
            const { data } = await Http.post(UserEndpoints.Register, { ...userRegisterRequest });

            const response = new SuccessResponse<UserRegisterResponse>(data);

            return Promise.resolve(response);

        } catch (err) {
            const response = new FailedResponse<UserRegisterResponse>(err.code, err.message);

            return Promise.resolve(response);
        }
    }
};

Object.freeze(UserService);

export default UserService;