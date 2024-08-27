import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useApplied } from '../hooks/useApplied';
import NoJobsImage from '../assets/hiringcraft.png'; 

const AppliedJobsPage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const {
    appliedJobs,
    snackbarOpen,
    snackbarMessage,
    handleDeleteJob,
    handleSnackbarClose,
  } = useApplied(userInfo?._id);

  return (
    <Container sx={{ marginTop: 4 }}>
      {appliedJobs?.length === 0 ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} textAlign="center">
            <img src={NoJobsImage} alt="No Jobs" style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="h6" gutterBottom>
              Oops! You haven't applied to any jobs yet.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {appliedJobs?.map((job) => (
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
                  Cancel Application
                </Button>
                <Button
                  component={Link}
                  to={`/jobs/${job._id}/applicants`}
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ marginBottom: 1 }}
                >
                  View Status
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default AppliedJobsPage;
