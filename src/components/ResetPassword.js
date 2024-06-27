import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/userService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import checkPassword from '../utils/checkPassword'; // Import checkPassword utility
import PasswordValidateHint from './PasswordValidateHint';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.resetPassword);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword && passwordValid) {
      dispatch(resetPassword({ otp, newPassword }));
    } else {
      alert('Passwords do not match or do not meet criteria');
    }
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (value) => {
    const isValid = checkPassword(value);
    setPasswordValid(isValid);
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
    <>
      <Typography variant="body1" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handlePasswordReset} style={{ width: '100%' }}>
        <TextField
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          type="number"
        />
        <TextField
          error={!passwordValid} // Show error if password does not meet criteria
          helperText={!passwordValid ? 'Password must meet criteria' : ''}
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            validatePassword(e.target.value); 
          }}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleNewPasswordVisibility} edge="end">
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={!passwordValid} // Show error if password does not meet criteria
          helperText={!passwordValid ? 'Password must meet criteria' : ''}
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validatePassword(newPassword); 
          }}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <PasswordValidateHint newPassword={newPassword} passwordValid={passwordValid}/>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid() && otp.length>8 && (loading  || !passwordValid)} 
          >
            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
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

export default ResetPassword;
