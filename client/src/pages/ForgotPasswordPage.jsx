import React from 'react';
import { Container, Box, Divider, Typography, Link } from '@mui/material';
import SendOtp from '../components/SendOtp';
import ResetPassword from '../components/ResetPassword';

const ForgotPasswordPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <SendOtp />
        <Divider style={{ width: '100%', margin: '2rem 0' }} />
        <ResetPassword />
        <Box mt={2}>
          <Typography variant="body2">
            Remember your password?{' '}
            <Link href="/login" variant="body2">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
