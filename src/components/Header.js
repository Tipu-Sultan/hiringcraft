// components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import hiringcraft from '../assets/hiringcraft.png';

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar src={hiringcraft} alt="HiringCraft Logo" sx={{ marginRight: 2 }} />
        <Typography 
          component={Link} 
          to="/" 
          variant="h6" 
          style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          HiringCraft
        </Typography>
        {userInfo ? (
          <>
            {userInfo.role === 'employer' && (
              <>
                <Button color="inherit" component={Link} to="/create-job">
                  Create Job
                </Button>
                <Button color="inherit" component={Link} to="/posted-jobs">
                  Posted Jobs
                </Button>
              </>
            )}
            <Button color="inherit" component={Link} to={`/profile/${userInfo._id}`}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
