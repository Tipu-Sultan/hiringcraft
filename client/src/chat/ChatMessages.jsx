import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const ChatMessages = ({ messages }) => {
  const theme = useTheme();

  return (
    <Box flexGrow={1} p={2} overflow="auto" bgcolor={theme.palette.background.default}>
      {messages.map((message, index) => (
        <Typography key={index} color={theme.palette.text.primary}>{message}</Typography>
      ))}
    </Box>
  );
};

export default ChatMessages;
