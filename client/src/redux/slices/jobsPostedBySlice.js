import { createSlice } from '@reduxjs/toolkit';
import { createJob, deleteJob, fetchJobApplicants, fetchJobById, fetchJobspostedBy, updateJob } from '../../services/jobService';

const postedBySlice = createSlice({
  name: 'postedBy',
  initialState: {
    postedBy: [],
    applicants: [],
    getJob:{},
    loading: false,
    error: null,
    message: null,
    formState: {
      companyName: '',
      jobTitle: '',
      location: '',
      experience: '',
      description: '',
    }
  },
  reducers: {
    setFormState(state, action) {
      state.formState = { ...state.formState, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.postedBy.push(action.payload);
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
        state.postedBy = state.postedBy.map(job => job._id === action.payload._id ? action.payload : job);
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobspostedBy.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobspostedBy.fulfilled, (state, action) => {
        state.postedBy = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchJobspostedBy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
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

      .addCase(fetchJobApplicants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchJobApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.postedBy = state.postedBy.filter(job => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const { setFormState} = postedBySlice.actions;
export default postedBySlice.reducer;
