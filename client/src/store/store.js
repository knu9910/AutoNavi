import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import carSlice from './carSlice';
import mainReducer from './mainSlice';
import chargeSlice from './chargeSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    carStore: carSlice.reducer,
    chargeStore: chargeSlice.reducer,
    mainStore: mainReducer,
  },
});

export default store;
