import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userApp',
  initialState: { auth: false, role: null },
  reducers: {
    isLogin(state) {
      state.auth = true;
    },
    isLogout(state) {
      state.auth = false;
      state.role = null;
    },
    isMaster(state) {
      state.role = 'master';
    },
  },
});

export default userSlice;
export const { isLogin, isLogout, isMaster } = userSlice.actions;
