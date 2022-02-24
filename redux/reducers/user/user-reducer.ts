import { userActions } from '@/redux/actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: any;
}

const initialState: UserState = {
    user: {}
};

export const userReducer = createSlice({
    extraReducers: (builder) => {
        builder.addCase(userActions.loginUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        });
    },
    initialState,
    name: 'user',
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        }
    },
});

export default userReducer.reducer;