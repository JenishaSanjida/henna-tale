import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './reducers/apiSlice';
import placeReducer from './reducers/placeSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    place: placeReducer,
    user: userReducer
  }
});

export default store;
