import React, { useEffect, useState } from 'react';
import { Box, AppBar, Tabs, Tab, Typography, Container, Paper, IconButton } from '@mui/material';
import { AccountCircle, Work, Security, Warning } from '@mui/icons-material';

// Import your sub-components
import Profile from '../setting/Profile';
import YourJobs from '../setting/YourJobs';
import PrivacySecurity from '../setting/PrivacySecurity';
import DangerZone from '../setting/DangerZone';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileById } from '../services/userProfileService';

// Define a tab panel component to show the content
const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const SettingPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.userProfile.profileInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    dispatch(fetchUserProfileById(userInfo._id));
  }, [dispatch, userInfo._id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <AppBar position="static" color="default">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="settings tabs"
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Your Profile"
              id="tab-0"
              aria-controls="tabpanel-0"
              icon={<AccountCircle />}
            />
            <Tab
              label="Your Jobs"
              id="tab-1"
              aria-controls="tabpanel-1"
              icon={<Work />}
            />
            <Tab
              label="Privacy & Security"
              id="tab-2"
              aria-controls="tabpanel-2"
              icon={<Security />}
            />
            <Tab
              label="Danger Zone"
              id="tab-3"
              aria-controls="tabpanel-3"
              icon={<Warning />}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTab} index={0}>
          <Profile userInfo={profileInfo} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <YourJobs userInfo={profileInfo}/>
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <PrivacySecurity userInfo={profileInfo}/>
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <DangerZone userInfo={profileInfo}/>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default SettingPage;
