// components/PasswordValidateHint.jsx

import React from 'react';
import { Typography, Box } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material'; // Import icons

const PasswordValidateHint = ({ newPassword, passwordValid }) => {
  return (
    <Box>
      {newPassword && (
        <Typography variant="body2">
          Password must contain:
          <ul>
            <li>
              At least 8 characters{' '}
              {passwordValid.length ? (
                <CheckCircle style={{ color: 'green', verticalAlign: 'middle', marginLeft: '5px' }} />
              ) : (
                <Cancel style={{ color: 'red', verticalAlign: 'middle', marginLeft: '5px' }} />
              )}
            </li>
            <li>
              At least one lowercase letter{' '}
              {passwordValid.lowercase ? (
                <CheckCircle style={{ color: 'green', verticalAlign: 'middle', marginLeft: '5px' }} />
              ) : (
                <Cancel style={{ color: 'red', verticalAlign: 'middle', marginLeft: '5px' }} />
              )}
            </li>
            <li>
              At least one uppercase letter{' '}
              {passwordValid.uppercase ? (
                <CheckCircle style={{ color: 'green', verticalAlign: 'middle', marginLeft: '5px' }} />
              ) : (
                <Cancel style={{ color: 'red', verticalAlign: 'middle', marginLeft: '5px' }} />
              )}
            </li>
            <li>
              At least one number{' '}
              {passwordValid.number ? (
                <CheckCircle style={{ color: 'green', verticalAlign: 'middle', marginLeft: '5px' }} />
              ) : (
                <Cancel style={{ color: 'red', verticalAlign: 'middle', marginLeft: '5px' }} />
              )}
            </li>
            <li>
              At least one special character (@, #, $, etc.){' '}
              {passwordValid.specialChar ? (
                <CheckCircle style={{ color: 'green', verticalAlign: 'middle', marginLeft: '5px' }} />
              ) : (
                <Cancel style={{ color: 'red', verticalAlign: 'middle', marginLeft: '5px' }} />
              )}
            </li>
          </ul>
        </Typography>
      )}
    </Box>
  );
};

export default PasswordValidateHint;
