// src/App.js

import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobPage from './pages/JobPage';
import JobDetailPage from './pages/JobDetailPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import JobForm from './components/JobForm';
import VerifyEmailPage from './pages/VerifyEmailPage';
import PostedJobsPage from './pages/PostedJobsPage'; // Import PostedJobsPage component
import ViewApplicantsPage from './pages/ViewApplicantsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AppliedJobsPage from './pages/AppliedJobsPage';
import SettingPage from './pages/SettingPage';
import { lightTheme, darkTheme } from './themes';
import ChatPage from './pages/ChatPage';
import RoleBasedPage from './components/RoleBasedPage';


const App = () => {

  const [themeMode, setThemeMode] = useState('dark'); // Default theme is light

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<RoleBasedPage />} />
          </Route>



          <Route path="/verify-email" element={<PrivateRoute roles={['employer', 'normal', 'super-admin']} />} >
            <Route element={<VerifyEmailPage mode="verify" />} />
          </Route>

          <Route path="/chat" element={<PrivateRoute roles={['employer', 'normal']} />}>
            <Route element={<ChatPage mode="chat" />} />
          </Route>
          <Route path="/profile/:userId" element={<PrivateRoute roles={['employer', 'normal']} />}>
            <Route element={<ProfilePage mode="profile" />} />
          </Route>

          <Route path="/setting/:userId" element={<PrivateRoute roles={['employer', 'normal']} />}>
            <Route element={<SettingPage mode="setting" />} />
          </Route>

          <Route path="/jobs/:id" element={<JobDetailPage />} />

          <Route path="job/create-job" element={<PrivateRoute roles={['employer']} />}>
            <Route element={<JobForm mode="create" />} />
          </Route>
          <Route path="/update-job/:jobId" element={<PrivateRoute roles={['employer']} />}>
            <Route element={<JobForm mode="update" />} />
          </Route>
          <Route path="/jobs/:jobId/applicants" element={<PrivateRoute roles={['employer']} />}>
            <Route element={<ViewApplicantsPage mode="view" />} />
          </Route>
          <Route path="jobs/posted-jobs" element={<PrivateRoute roles={['employer']} />}>
            <Route element={<PostedJobsPage />} />
          </Route>
          <Route path="jobs/applied-jobs" element={<PrivateRoute roles={['normal']} />}>
            <Route element={<AppliedJobsPage />} />
          </Route>
        </Routes>
      </ThemeProvider>

    </Router>
  );
};

export default App;
