import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    loggedInUserDetail: null,
    userList: null,
    paginationDetails: null
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
        },
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        setPaginationDetails: (state, action) => {
            state.paginationDetails = action.payload;
        }
    },
});

export const {
    setAccessToken,
    setLoggedInUserDetail,
    setUserList,
    setPaginationDetails
} = userSlice.actions;

export default userSlice.reducer;
