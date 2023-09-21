import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'userApp',
  initialState: { auth: false, role: null },
  reducers: {
    isLogin(state) {
      state.auth = true;
    },

    isMaster(state) {
      state.role = 'master';
    },
  },
});

export default userSlice;
export const { isLogin } = userSlice.actions;
export const { isMaster } = userSlice.actions;
