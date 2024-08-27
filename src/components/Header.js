import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import hiringcraft from '../assets/hiringcraft.png';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ toggleTheme, themeMode }) => {
  const toggleIcon = themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <>
      {userInfo ? (
        <>
          {userInfo.role === 'employer' && (
            <>
              <ListItem component={Link} to="/create-job">
                <ListItemText primary="Create Job" />
              </ListItem>
              <ListItem component={Link} to="/posted-jobs">
                <ListItemText primary="Posted Jobs" />
              </ListItem>
              <Divider />
            </>
          )}
          {userInfo.role === 'normal' && (
            <>
              <ListItem component={Link} to="jobs/applied-jobs">
                <ListItemText primary="Applied Jobs" />
              </ListItem>
              <Divider />
            </>
          )}
          <ListItem component={Link} to={`/profile/${userInfo._id}`}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ marginRight: 2 }}>
          <a href='/'>
            <img
              style={{ textDecoration: 'none', color: 'inherit', height: '40px', marginRight: '8px', cursor: 'pointer' }}
              src={hiringcraft}
              alt="HiringCraft Logo"
            />
          </a>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                {menuItems}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            {userInfo ? (
              <>
                {userInfo.role === 'employer' && (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="job/create-job"
                      sx={{ '&:hover': { backgroundColor: '#303f9f', color: '#fff' }, marginRight: 2 }}
                    >
                      Create Job
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="jobs/posted-jobs"
                      sx={{ '&:hover': { backgroundColor: '#303f9f', color: '#fff' }, marginRight: 2 }}
                    >
                      Posted Jobs
                    </Button>
                  </>
                )}
                {userInfo.role === 'normal' && (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="jobs/applied-jobs"
                      sx={{ '&:hover': { backgroundColor: '#303f9f', color: '#fff' }, marginRight: 2 }}
                    >
                      Applied Jobs
                    </Button>
                  </>
                )}
                {(userInfo.role === 'normal' || userInfo.role === 'employer') &&(
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="chat"
                      sx={{ '&:hover': { backgroundColor: '#303f9f', color: '#fff' }, marginRight: 2 }}
                    >
                      Chat
                    </Button>
                  </>
                )}
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  sx={{ '&:hover': { backgroundColor: '#303f9f' } }}
                >
                  {userInfo.profileImage ? (
                    <Avatar src={userInfo.profileImage} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to={`/profile/${userInfo._id}`}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem component={Link} to={`/setting/${userInfo._id}`}>Settings</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ '&:hover': { backgroundColor: '#303f9f', color: '#fff' }, marginRight: 2 }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{ '&:hover': { backgroundColor: '#303f9f', color: '#fff' } }}
                >
                  Register
                </Button>
              </>
            )}
          </>
        )}
        {/* Toggle Theme Button */}
        <IconButton onClick={toggleTheme} color="inherit" sx={{ marginLeft: '10px' }}>
          {toggleIcon}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
