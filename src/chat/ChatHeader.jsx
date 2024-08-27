import React from 'react';
import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChatHeader = ({ user, onMenuClick, isMobile }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom={1} borderColor="grey.300" bgcolor={theme.palette.background.paper}>
      <Box display="flex" alignItems="center">
        {isMobile && (
          <IconButton onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}
        <Avatar src={user.avatar} sx={{ ml: isMobile ? 1 : 0 }} />
        <Typography variant="h6" ml={2}>{`Chat with ${user.name}`}</Typography>
      </Box>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
      </Menu>
    </Box>
  );
};

export default ChatHeader;
