import { BaseResponse, UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from '@/models';

export interface IUserService {
  login(userLoginRequest: UserLoginRequest): Promise<BaseResponse<UserLoginResponse>>;
  register(userLoginRequest: UserRegisterRequest): Promise<BaseResponse<UserRegisterResponse>>;
}