import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    isNavVisible: true,
    buttonText: '운행중',
  },
  reducers: {
    toggleButton: (state) => {
      state.isNavVisible = !state.isNavVisible;
      state.buttonText = state.isNavVisible ? '운행중' : '충전소';
    },
  },
});

export const { toggleButton } = toggleSlice.actions;
export default toggleSlice.reducer;
