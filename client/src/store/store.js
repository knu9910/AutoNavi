import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import carSlice from './carSlice';
import toggleReducer from './toggleSlice';
import chargeSlice from './chargeSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    carStore: carSlice.reducer,
    chargeStore: chargeSlice.reducer,
    toggleStore: toggleReducer,
  },
});

export default store;
