import { createSlice } from '@reduxjs/toolkit';
const carSlice = createSlice({
  name: 'carApp',
  initialState: { carList: [], currentCar: [], carsInfo: [] },
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
  },
});

export default carSlice;
export const { getCarList, getCurrentCar, addCar, deleteCar, getCarsInfo } =
  carSlice.actions;
