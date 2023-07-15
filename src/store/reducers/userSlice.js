import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    isLoggedIn: false,
    loggedInUserDetail: null,
    userList: null,
    paginationDetails: null,
    selectedDesigner: null,
    designerSchedules: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setLoggedInUserDetail: (state, action) => {
            state.loggedInUserDetail = action.payload;
        },
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        setPaginationDetails: (state, action) => {
            state.paginationDetails = action.payload;
        },
        setSelectedDesigner: (state, action) => {
            state.selectedDesigner = action.payload;
        },
        setDesignerSchedules: (state, action) => {
            state.designerSchedules = action.payload;
        }
    },
});

export const {
    setAccessToken,
    setIsLoggedIn,
    setLoggedInUserDetail,
    setUserList,
    setPaginationDetails,
    setSelectedDesigner,
    setDesignerSchedules
} = userSlice.actions;

export default userSlice.reducer;
