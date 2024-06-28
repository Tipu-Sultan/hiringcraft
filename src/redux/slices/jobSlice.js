import { createSlice } from '@reduxjs/toolkit';
import { applyJob, createJob, deleteJob, fetchJobById, fetchJobs, updateJob, fetchJobApplicants, fetchJobspostedBy, fetchAppliedJobs } from '../../services/jobService';

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
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
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

      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload); // Push new job to the jobs array
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        // Update the existing job in the jobs array based on job ID
        state.jobs = state.jobs.map(job => job._id === action.payload._id ? action.payload : job);
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(applyJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyJob.fulfilled, (state,action) => {
        state.loading = false;
        state.error = null;
        state.jobs.applicants.push(action.payload.applicant);
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter(job => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
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
      ;
  },
});

export default jobSlice.reducer;
