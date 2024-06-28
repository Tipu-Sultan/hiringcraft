import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useApplicants } from '../hooks/useApplicants';

const ViewApplicantsPage = () => {
  const { jobId } = useParams();
  const { applicants, loading, error } = useApplicants(jobId);
  if (loading) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Applicants
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(applicants) && applicants.map((applicant) => (
          <Grid item xs={12} sm={6} md={4} key={applicant._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {applicant.name}
                </Typography>
                <Typography gutterBottom>{applicant.email}</Typography>
                <Typography>{applicant.address}</Typography>
              </CardContent>
              <Button
                component={Link}
                to={`/profile/${applicant._id}`}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginBottom: 1 }}
              >
                View Profile
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewApplicantsPage;
