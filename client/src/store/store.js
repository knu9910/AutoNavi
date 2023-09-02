import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import carSlice from './carSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    boardStore: carSlice.reducer,
  },
});

export default store;
