import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { usePostedJobs } from '../hooks/postedJobHooks';
import { useSelector } from 'react-redux';

const PostedJobsPage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const {
    jobs,
    snackbarOpen,
    snackbarMessage,
    handleDeleteJob,
    handleSnackbarClose,
  } = usePostedJobs(userInfo._id);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        {Array.isArray(jobs) && jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {job.jobTitle}
                </Typography>
                <Typography gutterBottom>{job.companyName}</Typography>
                <Typography gutterBottom>{job.location}</Typography>
                <Typography>{job.experience}</Typography>
              </CardContent>
              <Button
                component={Link}
                to={`/jobs/${job._id}`}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginBottom: 1 }}
              >
                View Job
              </Button>
              <Button
                onClick={() => handleDeleteJob(job._id)}
                variant="contained"
                color="error"
                fullWidth
                sx={{ marginBottom: 1 }}
              >
                Delete Job
              </Button>
              <Button
                component={Link}
                to={`/jobs/${job._id}/applicants`}
                variant="contained"
                color="success"
                fullWidth
                sx={{ marginBottom: 1 }}
              >
                View Applicants
              </Button>
              <Button
                component={Link}
                to={`/update-job/${job._id}`}
                variant="contained"
                color="warning"
                fullWidth
              >
                Edit
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default PostedJobsPage;
