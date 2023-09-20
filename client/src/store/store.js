import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import carSlice from './carSlice';
import toggleReducer from './toggleSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    carStore: carSlice.reducer,
    toggleStore: toggleReducer,
  },
});

export default store;
