import { createSlice } from '@reduxjs/toolkit';

const chargeSlice = createSlice({
  name: 'cargeApp',
  initialState: { chargeList: [] },
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
  },
});

export const { addCharge, deleteCharge } = chargeSlice.actions;
export default chargeSlice;
