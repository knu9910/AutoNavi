import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    isNavVisible: true,
  },
  reducers: {
    toggleButton: (state) => {
      state.isNavVisible = !state.isNavVisible;
    },
  },
});

export const { toggleButton } = toggleSlice.actions;
export default toggleSlice.reducer;
