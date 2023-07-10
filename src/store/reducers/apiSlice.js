import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk with a custom URL
export const createDynamicAsyncThunk = createAsyncThunk(
    'api/fetchDynamicData',
    async (url, options = {}) => {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
);


const apiSlice = createSlice({
    name: 'api',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Dynamically create the async thunk and handle its actions
        builder
            .addCase(createDynamicAsyncThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDynamicAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createDynamicAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default apiSlice.reducer;

// Usage example:
// Dispatch the dynamicThunk action with a URL as the payload
// dispatch(dynamicThunk('https://api.example.com/dynamic-data'));
