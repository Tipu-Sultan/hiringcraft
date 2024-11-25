import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobPage from './pages/JobPage';
import JobDetailPage from './pages/JobDetailPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import JobForm from './components/JobForm';
import VerifyEmailPage from './pages/VerifyEmailPage';
import PostedJobsPage from './pages/PostedJobsPage';
import ViewApplicantsPage from './pages/ViewApplicantsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AppliedJobsPage from './pages/AppliedJobsPage';
import SettingPage from './pages/SettingPage';
import { lightTheme, darkTheme } from './themes';
import ChatPage from './pages/ChatPage';
import RoleBasedPage from './components/RoleBasedPage';

const App = () => {
  const [themeMode, setThemeMode] = useState('dark');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header toggleTheme={toggleTheme} themeMode={themeMode} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute roles={['employer', 'normal']}>
                <RoleBasedPage mode="index" />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute roles={['employer', 'normal']}>
                <ChatPage mode="chat" />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <PrivateRoute roles={['employer', 'normal']}>
                <ProfilePage mode="profile" />
              </PrivateRoute>
            }
          />
          <Route
            path="/setting/:userId"
            element={
              <PrivateRoute roles={['employer', 'normal']}>
                <SettingPage mode="setting" />
              </PrivateRoute>
            }
          />
          <Route
            path="/job/create-job"
            element={
              <PrivateRoute roles={['employer']}>
                <JobForm mode="create" />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-job/:jobId"
            element={
              <PrivateRoute roles={['employer']}>
                <JobForm mode="update" />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/:jobId/applicants"
            element={
              <PrivateRoute roles={['employer']}>
                <ViewApplicantsPage mode="view" />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/posted-jobs"
            element={
              <PrivateRoute roles={['employer']}>
                <PostedJobsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/applied-jobs"
            element={
              <PrivateRoute roles={['normal']}>
                <AppliedJobsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
