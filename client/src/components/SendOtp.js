import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} 
from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../services/userService';

const SendOtp = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.otp);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOtp({ email }));
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter your email to receive an OTP for password reset.
      </Typography>
      <form onSubmit={handleOtpSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          type="email"
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send OTP'}
          </Button>
        </Box>
        {error && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="primary" style={{ marginTop: '1rem' }}>
            {message}
          </Typography>
        )}
      </form>
    </>
  );
};

export default SendOtp;
