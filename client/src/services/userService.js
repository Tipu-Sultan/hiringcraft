// redux/slices/userSlice.js
import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('user/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/api/users`, userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/api/users/login`, userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const sendOtp = createAsyncThunk('user/sendOtp', async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/users/forgot-password`, { email });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
});

export const resetPassword = createAsyncThunk('user/resetPassword', async ({otp, newPassword }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/users/forgot-password`, {otp, newPassword });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
});