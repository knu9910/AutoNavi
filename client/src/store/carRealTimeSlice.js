import { createSlice } from '@reduxjs/toolkit';
const carRealTimeSlice = createSlice({
  name: 'carRealTimeApp',
  initialState: { realTimeList: [] },
  reducers: {
    getRealTimeList(state, action) {
      state.realTimeList = action.payload.realTimeList;
    },
  },
});

export default carRealTimeSlice;
export const { getRealTimeList } = carRealTimeSlice.actions;
