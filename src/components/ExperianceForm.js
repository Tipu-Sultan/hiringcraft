import React from 'react';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import useExperiance from '../hooks/useExperiance';

const ExperienceForm = ({
  setCheckExperienceFormStatus
}) => {
  const {
    companyName,
    jobProfile,
    jobType,
    jobDescription,
    setCompanyName,
    setJobProfile,
    setJobType,
    setJobDescription,
    handleExperienceSubmit,
    snackbarMessage,
    snackbarOpen,
    handleSnackbarClose
  } = useExperiance();
  return (
    <form onSubmit={handleExperienceSubmit}>
      <TextField
        label="Company Name"
        placeholder="Enter company name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Job Profile"
        placeholder="Enter job profile"
        value={jobProfile}
        onChange={(e) => setJobProfile(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Job Type"
        placeholder="Enter job type"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Job Description"
        placeholder="Enter job description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button onClick={() => setCheckExperienceFormStatus(false)} variant="outlined" color="secondary" style={{ marginLeft: '1rem' }}>
          Cancel
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </form>
  );
};

export default ExperienceForm;
