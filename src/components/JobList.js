import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../services/jobService';
import BusinessIcon from '@mui/icons-material/Business';
import TitleIcon from '@mui/icons-material/Title';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import NoJobsImage from '../assets/hiringcraft.png'; 


const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Jobs not found</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {Array.isArray(jobs) && jobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} key={job._id}>
          <Card>
            {job.jobImage && (
              <CardMedia
                component="img"
                height="140"
                image={NoJobsImage}
                alt={job.jobTitle}
              />
            )}
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <BusinessIcon sx={{ mr: 1 }} />
                <Typography variant="h6">{job.companyName}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <TitleIcon sx={{ mr: 1 }} />
                <Typography>{job.jobTitle}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography>{job.location}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <WorkIcon sx={{ mr: 1 }} />
                <Typography>{job.experience}</Typography>
              </Box>
              <Button  sx={{ marginTop: 1 }} component={Link} to={`/jobs/${job._id}`} variant="contained" color="primary">
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
