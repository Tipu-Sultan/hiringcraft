// src/pages/VerifyEmailPage.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, CircularProgress } from '@mui/material';

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
          setMessage('Invalid verification link');
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/api/users/verify-email?token=${token}`);
        setMessage(data.message);
        setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 30000);
      } catch (error) {
        setMessage(error.response.data.message);
      } 
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <Container maxWidth="sm">
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h6" component="h1" gutterBottom>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default VerifyEmailPage;
