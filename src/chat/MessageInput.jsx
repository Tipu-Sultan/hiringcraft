import React from 'react';
import { Box, Paper, TextField, IconButton, InputAdornment, useTheme } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const MessageInput = () => {
  const theme = useTheme();

  return (
    <Box p={2} borderTop={1} borderColor="grey.300" bgcolor={theme.palette.background.paper}>
      <Paper component="form" sx={{ display: 'flex', alignItems: 'center', bgcolor: theme.palette.background.default }}>
        <TextField
          fullWidth
          placeholder="Type a message"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Box>
  );
};

export default MessageInput;
