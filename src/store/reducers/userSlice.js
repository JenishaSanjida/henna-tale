import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    loggedInUserDetail: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setLoggedInUserDetail: (state, action) => {
            state.loggedInUserDetail = action.payload;
        }
    },
});

export const {
    setAccessToken,
    setLoggedInUserDetail,
} = userSlice.actions;

export default userSlice.reducer;
