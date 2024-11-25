import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUserAuth } from '../hooks/userAuthHooks';
import { Link } from 'react-router-dom';
import hiringcraft from '../assets/hiringcraft.png';


const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
    loading,
  } = useUserAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <img
            style={{height: '40px', marginRight: '8px', cursor: 'pointer' }}
            src={hiringcraft}
            alt="HiringCraft Logo"
          />
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Link to="forgot-password" variant="body2">
              Forgot Password?
            </Link>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading?'Loggin...':'Login'}
            </Button>
          </Box>
          {error && (
            <Typography color="error" style={{ marginTop: '1rem' }}>
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/register" variant="body2">
                Create Account
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
