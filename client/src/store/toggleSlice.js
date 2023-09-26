import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    isNavVisible: true,
    buttonText: '충전소',
  },
  reducers: {
    toggleButton: (state) => {
      state.isNavVisible = !state.isNavVisible;
    },
  },
});

export const { toggleButton } = toggleSlice.actions;
export default toggleSlice.reducer;
