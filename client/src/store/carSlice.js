import { createSlice } from '@reduxjs/toolkit';
const carSlice = createSlice({
  name: 'carApp',
  initialState: { carList: [], currentCar: [] },
  reducers: {
    getCarList(state, action) {
      state.carList = action.payload.carList;
    },
  },
});

export default carSlice;
export const { getCarList } = carSlice.actions;
