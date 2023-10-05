import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: { allCarsHistorys: [], currentCarHistory: {} },
  reducers: {
    getCarsHistorys(state, action) {
      state.allCarsHistorys = action.payload.historys;
    },
  },
});

export default historySlice;
export const { getCarsHistorys } = historySlice.actions;
