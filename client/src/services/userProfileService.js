// redux/slices/userSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (userData, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile`, userData, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchUserProfileById = createAsyncThunk('user/fetchUserProfileById', async (userId, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile/${userId}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateUserEducationProfile = createAsyncThunk('user/updateUserProfile/education', async (userData, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile/education`, userData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const handlerEduCationDelete = createAsyncThunk('user/handlerEduCationDelete/education', async (eduId, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile/education?eduId=${eduId}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateUserExperianceProfile = createAsyncThunk('user/updateUserProfile/experiance', async (userData, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile/experiance`, userData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const handlerExperianceDelete = createAsyncThunk('user/handlerExperianceDelete/education', async (exId, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile/experiance?exId=${exId}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateUserProjectProfile = createAsyncThunk('user/updateUserProfile/project', async (userData, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile/project`, userData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const handlerProjectDelete = createAsyncThunk('user/handlerProjectDelete/education', async (proId, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/user-profile/profile/project?proId=${proId}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});






