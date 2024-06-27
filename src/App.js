// src/App.js

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
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

const App = () => {

  return (
    <Router>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<JobPage />} />
        <Route path="/verify-email" element={<PrivateRoute roles={['employer', 'normal', 'super-admin']} />} >
          <Route index element={<VerifyEmailPage mode="verify" />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile/:userId" element={<ProfilePage />} />
          
          <Route path="/jobs/:id" element={<JobDetailPage />} />

          <Route path="/create-job" element={<PrivateRoute roles={['employer']} />}>
            <Route index element={<JobForm mode="create" />} />
          </Route>
          <Route path="/update-job/:jobId" element={<PrivateRoute roles={['employer']} />}>
            <Route index element={<JobForm mode="update" />} />
          </Route>
          <Route path="/jobs/:jobId/applicants" element={<PrivateRoute roles={['employer']} />}>
            <Route index element={<ViewApplicantsPage mode="view" />} />
          </Route>
          <Route path="/posted-jobs" element={<PrivateRoute roles={['employer']} />}>
            <Route index element={<PostedJobsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
