import { createSlice } from '@reduxjs/toolkit';
import { applyJob,fetchJobById, fetchJobs, fetchAppliedJobs, filterJobs, cancelJobApplication } from '../../services/jobService';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    getJob:{},
    appliedJobs:[],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending || filterJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled || filterJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(fetchJobs.rejected || filterJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })      

      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.getJob = action.payload;
        state.error = null;
      })      
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(applyJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Find the job by ID and update its applicants
        const jobIndex = state.jobs.findIndex(job => job._id === action.payload.jobId);
        if (jobIndex !== -1) {
          state.jobs[jobIndex].applicants.push(action.payload.userId);
          state.appliedJobs.push(action.payload.appliedJobData[0]);
        }
        state.message = action.payload.message;
      })      
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(fetchAppliedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobs = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelJobApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelJobApplication.fulfilled, (state, action) => {
        state.loading = false;      
        state.appliedJobs = state.appliedJobs.filter(appid => appid._id !== action.payload.jobId);
        // Find the job in the jobs array and update its applicants
        const jobIndex = state.jobs.findIndex(job => job._id === action.payload.jobId);
        if (jobIndex !== -1) {
          state.jobs[jobIndex].applicants = state.jobs[jobIndex].applicants.filter(
            applicantId => applicantId !== action.payload.userId
          );
        }
        state.message = action.payload.message;
      })            
      .addCase(cancelJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export default jobSlice.reducer;
