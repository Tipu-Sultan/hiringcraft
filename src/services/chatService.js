// redux/slices/chatSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const startChat = createAsyncThunk('chat/startChat', async (userId, { rejectWithValue }) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/api/chats`, { userId }, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (chatId, { rejectWithValue }) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/api/chats/${chatId}/messages`, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ chatId, message, attachments }, { rejectWithValue }) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/api/chats/messages`, { chatId, message, attachments }, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});