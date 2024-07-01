// redux/slices/jobSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/api/jobs`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const filterJobs = createAsyncThunk('jobs/fetchJobs', async (searchParams, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/api/jobs/filter`, { params: searchParams });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchJobspostedBy = createAsyncThunk('jobs/fetchJobspostedBy', async (postedBy, { rejectWithValue }) => {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/api/jobs/postedBy/${postedBy}`,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchJobApplicants = createAsyncThunk('jobs/fetchJobApplicants',async (jobId, { rejectWithValue }) => {
        try {
            const { token } = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_HOST}/api/jobs/${jobId}/applicants`,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchAppliedJobs = createAsyncThunk('jobs/fetchJobApplicants',async (userId, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_HOST}/api/jobs/${userId}/applied`,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

export const cancelJobApplication = createAsyncThunk('jobs/cancelJobApplication',async (jobId, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.delete(
            `${process.env.REACT_APP_API_HOST}/api/jobs/${jobId}/applied`,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

export const createJob = createAsyncThunk('jobs/createJob', async (jobData, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_HOST}/api/jobs`,
            jobData,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

export const updateJob = createAsyncThunk('jobs/updateJob', async (jobData, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(
            `${process.env.REACT_APP_API_HOST}/api/jobs/${jobData.id}`,
            jobData,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

export const fetchJobById = createAsyncThunk('jobs/fetchJobById',async (jobId, { rejectWithValue }) => {
        try {
            const { token } = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_HOST}/api/jobs/${jobId}`,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobId, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(`${process.env.REACT_APP_API_HOST}/api/jobs/${jobId}`, config);
        return jobId;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const applyJob = createAsyncThunk('jobs/applyJob', async (jobApplicationData, { rejectWithValue }) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/api/jobs/apply`, jobApplicationData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});