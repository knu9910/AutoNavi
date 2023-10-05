import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import carSlice from './carSlice';
import mainReducer from './mainSlice';
import chargeSlice from './chargeSlice';
import historySlice from './historySlice';
const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    carStore: carSlice.reducer,
    chargeStore: chargeSlice.reducer,
    mainStore: mainReducer,
    historyStore: historySlice.reducer,
  },
});

export default store;
