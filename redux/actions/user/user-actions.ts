import Http from '@/core/http';
import { UserLoginRequest, UserRegisterRequest } from '@/models';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'loginUser',
    async (userLoginRequest: UserLoginRequest) => {
        const response = await Http.post('/api/auth/login', { ...userLoginRequest }, { baseURL: '/' });

        return response.data;
    }
);

export const registerUser = createAsyncThunk(
    'registerUser',
    async (userRegisterRequest: UserRegisterRequest) => {
        const response = await Http.post('/api/auth/register', { ...userRegisterRequest }, { baseURL: '/' });

        return response;
    }
);

const userActions = {
    loginUser,
    registerUser
};

export default userActions;