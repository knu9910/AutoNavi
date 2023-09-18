import { createSlice } from '@reduxjs/toolkit';
const carSlice = createSlice({
  name: 'carApp',
  initialState: { carList: [], currentCar: [] },
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
      const index = carList.findIndex((car) => car.id === payload.id);
      carList.splice(index, 1);
    },
  },
});

export default carSlice;
export const { getCarList, getCurrentCar } = carSlice.actions;
