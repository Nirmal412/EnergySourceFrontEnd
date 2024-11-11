import { jwtDecode } from 'jwt-decode'
import { createSlice } from '@reduxjs/toolkit';
import { loginWithPassword } from '../builders/auth.builder';
// import { login } from '../builders/auth.builder';

const initialState = {
  user: null,
  token: null,
  loading: false,
  userRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload
      const decodedAccessToken = jwtDecode(action.payload)
      state.userRole = decodedAccessToken.userRole
    },
    setUserEmail: (state, action) => {
      state.email = action.payload
    },
    clearExtraReducers: (state) => {
      state.loading = false;
      state.error = null;
      state.userRole = null;
      state.user = null;
      state.token = null
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

    //   .addCase(logout.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(logout.fulfilled, (state) => {
    //     state.loading = false;
    //     state.user = null
    //     state.token = null
    //     state.userPhone = null
    //     state.error = null;
    //   })
    //   .addCase(logout.rejected, (state, action) => {
    //     state.loading = false;
    //     state.user = null;
    //     state.error = action.error.message;
    //   })
  },
});

export const {  setUserData, setUserToken, setUserEmail, logoutToken, clearExtraReducers } = authSlice.actions;
export default authSlice.reducer;