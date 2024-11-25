import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Snackbar,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { useJobDetails, useApplyJob } from '../hooks/useJobDetails';

const JobDetailPage = () => {
  const { job, id } = useJobDetails();
  const {
    handleApply,
    snackbarOpen,
    snackbarMessage,
    loading,
    setSnackbarOpen,
    hasApplied,
  } = useApplyJob(job);

  return (
    <Box mt={4}>
      <Container>
        {job ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Button
                onClick={() => handleApply(id)}
                variant="contained"
                color="primary"
                disabled={loading || hasApplied}
                sx={{ width: '100%', py: 1.5, mb: 2 }}
              >
                {loading ? 'Applying...' : hasApplied ? 'Applied' : 'Apply Now'}
              </Button>

              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
                {job.jobImage && (
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', md: '40%' }, objectFit: 'cover' }}
                    image={job.jobImage}
                    alt={job.jobTitle}
                  />
                )}
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="h4" gutterBottom>
                    {job.companyName}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    {job.jobTitle}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {job.location}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {job.experience}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </CardContent>
              </Card>

              <Button
                onClick={() => handleApply(id)}
                variant="contained"
                color="primary"
                disabled={loading || hasApplied}
                sx={{ width: '100%', py: 1.5 }}
              >
                {loading ? 'Applying...' : hasApplied ? 'Applied' : 'Apply Now'}
              </Button>

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Suggested Similar Jobs
              </Typography>
              {/* Example of a suggested job card */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">Job Title</Typography>
                  <Typography color="textSecondary">Company Name</Typography>
                  <Typography color="textSecondary">Location</Typography>
                </CardContent>
              </Card>
              {/* Repeat similar cards for other suggested jobs */}
            </Grid>
          </Grid>
        ) : (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" color="error">
              Job not found
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default JobDetailPage;
