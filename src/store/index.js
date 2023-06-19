import {configureStore} from '@reduxjs/toolkit';
import apiReducer from './reducers/apiSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
  }
});

export default store;
