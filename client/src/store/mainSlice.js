import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'toggle',
  initialState: {
    isNavVisible: true,
    buttonText: 'MAP',
    lat: 37.501307705888195,
    lng: 127.03963860275336,
  },
  reducers: {
    toggleButton: (state) => {
      state.isNavVisible = !state.isNavVisible;
    },
    changeCenter(state, action) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { toggleButton, changeCenter } = mainSlice.actions;
export default mainSlice.reducer;
