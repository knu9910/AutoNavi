import { createSlice } from '@reduxjs/toolkit';

const chargeSlice = createSlice({
  name: 'cargeApp',
  initialState: { chargeList: [], topCharges: [] },
  reducers: {
    addCharge: (state, action) => {
      state.chargeList.push(action.payload.charge);
    },
    deleteCharge: (state, action) => {
      const index = state.chargeList.findIndex((charge) => {
        return charge.car_id === Number(action.payload.id);
      });
      state.chargeList.splice(index, 1);
    },
    addTopCharge: (state, action) => {
      state.topCharges.push(action.payload.charge);
    },
    deleteTopCharges: (state, action) => {
      const newTopCharges = state.topCharges.filter((charge) => {
        return charge.car_id !== action.payload.id;
      });
      state.topCharges = newTopCharges;
    },
  },
});

export const { addCharge, deleteCharge, addTopCharge, deleteTopCharges } =
  chargeSlice.actions;
export default chargeSlice;
