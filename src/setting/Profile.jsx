import React from 'react';
import { Typography, Paper, Grid, Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Profile = ({ userInfo }) => {

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Your Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Image and Basic Info */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt={userInfo?.name}
                src={userInfo?.profileImage}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">{userInfo?.name}</Typography>
              <Typography variant="body1">{userInfo?.email}</Typography>
              <Typography variant="body1">Mobile: {userInfo?.mobile}</Typography>
              <Typography variant="body1">Role: {userInfo?.role}</Typography>
              {/* Verified Badge */}
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color={userInfo?.isVerified ? 'success' : 'error'}
                invisible={!userInfo?.isVerified}
              >
                <Avatar sx={{ bgcolor: userInfo?.isVerified ? '#4caf50' : '#f44336', width: 20, height: 20 }}>
                  <VerifiedUserIcon sx={{ fontSize: '1rem' }} />
                </Avatar>
              </Badge>
            </Grid>
          </Grid>
        </Grid>

        {/* Additional Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Additional Information</Typography>
          <Typography variant="body1">Address: {userInfo?.address}</Typography>
          <Typography variant="body1">Verified: {userInfo?.isVerified ? 'Yes' : 'No'}</Typography>

          {/* Number of Applied Jobs */}
          <Typography variant="h6" sx={{ mt: 3 }}>Applied Jobs</Typography>
          <Typography variant="body1">Number of Applied Jobs: {userInfo?.appliedJobs?.length}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
