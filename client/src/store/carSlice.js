import { createSlice } from '@reduxjs/toolkit';
const carSlice = createSlice({
  name: 'carApp',
  initialState: {
    carList: [],
    currentCar: {},
    carsInfo: [],
    carStatus: '운행',
  },
  reducers: {
    getCarList(state, action) {
      state.carList = action.payload.carList;
    },
    getCurrentCar(state, action) {
      state.currentCar = action.payload.currentCar;
    },
    addCar({ carList }, { payload }) {
      carList.push(payload.car);
    },
    deleteCar({ carList }, { payload }) {
      const index = carList.findIndex((car) => {
        return car.id === Number(payload.id);
      });
      carList.splice(index, 1);
    },
    getCarsInfo(state, { payload }) {
      state.carsInfo = payload.carsInfo;
    },
    changeCarStatus(state, action) {
      state.carStatus = action.payload.status;
    },
  },
});

export default carSlice;
export const {
  getCarList,
  getCurrentCar,
  addCar,
  deleteCar,
  getCarsInfo,
  changeCarStatus,
} = carSlice.actions;
