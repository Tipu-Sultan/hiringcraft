import { createSlice } from '@reduxjs/toolkit';
import { fetchJobspostedBy } from '../../services/jobService';

const postedBySlice = createSlice({
  name: 'postedBy',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  },
});

export const { } = postedBySlice.actions;
export default postedBySlice.reducer;
