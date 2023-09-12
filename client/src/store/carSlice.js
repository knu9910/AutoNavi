import { createSlice } from '@reduxjs/toolkit';
const carSlice = createSlice({
  name: 'carApp',
  initialState: { carList: [], currentCar: [] },
  reducers: {},
});

export default carSlice;
