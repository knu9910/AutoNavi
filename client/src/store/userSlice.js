import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userApp',
  initialState: { auth: false, role: null, controlRights: '없음' },
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
    isControl(state) {
      state.controlRights = '있음';
    },
  },
});

export default userSlice;
export const { isLogin, isLogout, isMaster, isControl } = userSlice.actions;
