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
          <>
            <Card>
              {job.jobImage && (
                <CardMedia component="img" height="300" image={job.jobImage} alt={job.jobTitle} />
              )}
              <CardContent>
                <Typography variant="h4">{job.companyName}</Typography>
                <Typography variant="h6">{job.jobTitle}</Typography>
                <Typography>{job.location}</Typography>
                <Typography>{job.experience}</Typography>
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
              sx={{ mt: 2 }}
            >
              {loading ? 'Applying...' : hasApplied ? 'Applied' : 'Apply'}
            </Button>

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
            />
          </>
        ) : (
          <Typography variant="h6">Job not found</Typography>
        )}
      </Container>
    </Box>
  );
};

export default JobDetailPage;
