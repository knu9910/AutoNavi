import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    allCarsHistorys: [],
    currentCarHistory: {},
    mostDrivenList: [],
    allCarsTripHistorys: [],
    carTripHistory: [],
    chargeHistory: [],
    todayTotalDistance: '',
    todayTotalChargePrice: '',
    chargeHistoryAll: [],
  },
  reducers: {
    getCarsHistorys(state, action) {
      state.allCarsHistorys = action.payload.historys;
    },
    sortCarsHistorys(state, action) {
      const sortCarsHistorys = [...state.allCarsHistorys];
      sortCarsHistorys.sort((a, b) => b.cum_distance - a.cum_distance);
      state.mostDrivenList = sortCarsHistorys.slice(0, 5);
    },
    getCarsTripHistorys(state, action) {
      state.allCarsTripHistorys = action.payload.allTripHistorys;
    },
    getOneTripHistory(state, action) {
      state.carTripHistory = action.payload.tripData;
    },
    getChargeHistory(state, action) {
      state.chargeHistory = action.payload.chargeData;
    },
    getTodayTotalDistance(state, action) {
      state.todayTotalDistance = action.payload.distance;
    },
    getTodayTotalChargePrice(state, action) {
      state.todayTotalChargePrice = action.payload.chargePrice;
    },
    getChargeHistoryAll(state, action) {
      state.chargeHistoryAll = action.payload.chargeHistorys;
    },
  },
});

export default historySlice;
export const {
  getCarsHistorys,
  sortCarsHistorys,
  getCarsTripHistorys,
  getOneTripHistory,
  getChargeHistory,
  getTodayTotalDistance,
  getTodayTotalChargePrice,
  getChargeHistoryAll,
} = historySlice.actions;
