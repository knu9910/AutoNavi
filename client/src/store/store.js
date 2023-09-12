import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import carSlice from './carSlice';
import carRealTime from './carRealTimeSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    carStore: carSlice.reducer,
    realTimeStore: carRealTime.reducer,
  },
});

export default store;
