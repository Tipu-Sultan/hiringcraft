// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import otpReducer from '../redux/slices/otpSlice';
import resetPasswordReducer from '../redux/slices/resetPasswordSlice';
import userReducer from './slices/userSlice';
import userProfileReducer from './slices/userProfileSlice';
import jobReducer from './slices/jobSlice';
import postedByJobReducer from './slices/jobsPostedBySlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userProfile: userProfileReducer,
    otp: otpReducer,
    resetPassword: resetPasswordReducer,
    jobs: jobReducer,
    postedBy: postedByJobReducer,
    chat: chatReducer,
  },
});

export default store;