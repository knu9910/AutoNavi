import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    allCarsHistorys: [],
    currentCarHistory: {},
    mostDrivenList: [],
  },
  reducers: {
    getCarsHistorys(state, action) {
      state.allCarsHistorys = action.payload.historys;
    },
    sortCarsHistorys(state, action) {
      const sortedCarsHistorys = [...state.allCarsHistorys];
      state.mostDrivenList = sortedCarsHistorys.sort(
        (a, b) => b.cum_distance - a.cum_distance,
      );
    },
  },
});

export default historySlice;
export const { getCarsHistorys, sortCarsHistorys } = historySlice.actions;
