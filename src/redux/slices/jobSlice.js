import { createSlice } from '@reduxjs/toolkit';
import { applyJob,fetchJobById, fetchJobs, fetchAppliedJobs, filterJobs, cancelJobApplication } from '../../services/jobService';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    applicants: [],
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
        state.jobs = action.payload;
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
        state.jobs.applicants.push(action.payload.applicant);
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.appliedJobs = state.appliedJobs.filter(job => job._id !== action.payload.jobId);
      })
      .addCase(cancelJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export default jobSlice.reducer;
