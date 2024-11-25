// redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfileById,handlerEduCationDelete,handlerExperianceDelete,handlerProjectDelete,updateUserEducationProfile, updateUserExperianceProfile, updateUserProfile, updateUserProjectProfile } from '../../services/userProfileService';

// Slice definition
const userSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profileInfo: null,  
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo = {
          ...state.profileInfo,
          address: action.payload.address,
          email: action.payload.email,
          mobile: action.payload.mobile,
          name: action.payload.name,
          profileImage: action.payload.profileImage,
          role: action.payload.role
        };

        state.message = action.payload.message;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchUserProfileById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo = action.payload;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserEducationProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserEducationProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo.education.push(action.payload.education);
        state.message = action.payload.message;
      })      
      .addCase(updateUserEducationProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserExperianceProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserExperianceProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo.experience.push(action.payload.experience);
        state.message = action.payload.message;
      })
      .addCase(updateUserExperianceProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProjectProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProjectProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo.project.push(action.payload.updatedProject);
        state.message = action.payload.message;
      })
      .addCase(updateUserProjectProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handlerEduCationDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(handlerEduCationDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo.education = state.profileInfo.education.filter(
          (education) => education._id !== action.meta.arg
        );
        state.message = action.payload.message;
      })
      .addCase(handlerEduCationDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handlerProjectDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(handlerProjectDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo.projects = state.profileInfo.projects.filter(
          (project) => project._id !== action.meta.arg
        );
        state.message = action.payload.message;
      })
      .addCase(handlerProjectDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handlerExperianceDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(handlerExperianceDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo.experience = state.profileInfo.experience.filter(
          (experience) => experience._id !== action.meta.arg
        );
        state.message = action.payload.message;
      })
      .addCase(handlerExperianceDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      ;
  },
});


export default userSlice.reducer;
