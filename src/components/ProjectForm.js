import React from 'react';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import useProject from '../hooks/useProject';

const ProjectForm = ({setCheckProjectFormStatus}) => {
  const {
    snackbarMessage,
    snackbarOpen,
    handleSnackbarClose,
    projectTitle,
    projectDuration,
    projectDescription,
    projectCodeOrHostLink,
    setProjectTitle,
    setProjectDuration,
    setProjectDescription,
    setProjectCodeOrHostLink,
    handleProjectSubmit,
  } = useProject();
  return (
    <form onSubmit={handleProjectSubmit}>
      <TextField
        label="Project Title"
        placeholder="Enter project title"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Project Duration"
        placeholder="Enter project duration"
        value={projectDuration}
        onChange={(e) => setProjectDuration(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Project Description"
        placeholder="Enter project description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Project Code or Host Link"
        placeholder="Enter project code or host link"
        value={projectCodeOrHostLink}
        onChange={(e) => setProjectCodeOrHostLink(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button
          onClick={() => setCheckProjectFormStatus(false)}
          variant="outlined"
          color="secondary"
          style={{ marginLeft: '1rem' }}
        >
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

export default ProjectForm;
