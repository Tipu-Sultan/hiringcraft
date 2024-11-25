import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser } from '../services/userService';
import { Link } from 'react-router-dom';
import checkPassword from '../utils/checkPassword'; // Import checkPassword utility
import PasswordValidateHint from '../components/PasswordValidateHint';
import hiringcraft from '../assets/hiringcraft.png';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('normal');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, role }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const criteria = checkPassword(newPassword);
    setPasswordValid(criteria);
  };

  const isFormValid = () => {
    return (
      passwordValid.length &&
      passwordValid.lowercase &&
      passwordValid.uppercase &&
      passwordValid.number &&
      passwordValid.specialChar
    );
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
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
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
            onChange={handlePasswordChange}
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
          <PasswordValidateHint newPassword={password} passwordValid={passwordValid}/>
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid() || loading}
          >
            Register
          </Button>
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
          <Box mt={2}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" variant="body2">
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
