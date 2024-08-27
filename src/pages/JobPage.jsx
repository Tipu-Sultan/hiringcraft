// pages/JobPage.js

import React from 'react';
import JobList from '../components/JobList';
import { Container, Typography, Box } from '@mui/material'; // Import Box component for flexible layout
import SearchPanel from '../components/SearchPanel';

const JobPage = () => {
  return (
    <Container>
      <Box textAlign="center" mt={10} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
        Find Your Skillful Jobs
        </Typography>
      </Box>
      <SearchPanel />
      <JobList />
    </Container>
  );
};

export default JobPage;
