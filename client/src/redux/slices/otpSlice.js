import { createSlice } from '@reduxjs/toolkit';
import { sendOtp } from '../../services/userService';

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { } = otpSlice.actions;
export default otpSlice.reducer;
