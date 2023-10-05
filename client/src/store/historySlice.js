import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    allCarsHistorys: [],
    currentCarHistory: {},
    mostDrivenList: [],
    allCarsTripHistorys: [],
    todayTotalDistance: '',
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
    getCarsTripHistorys(state, action) {
      state.allCarsTripHistorys = action.payload.allTripHistorys;
    },
    getTodayTotalDistance(state, action) {
      state.todayTotalDistance = action.payload.distance;
    },
  },
});

export default historySlice;
export const {
  getCarsHistorys,
  sortCarsHistorys,
  getCarsTripHistorys,
  getTodayTotalDistance,
} = historySlice.actions;
