// src/components/JobForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import { createJob, updateJob, fetchJobById } from '../services/jobService';
import RichTextEditor from './RichTextEditor'; // Import RichTextEditor component

const StyledForm = styled('form')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%',
    margin: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const JobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const [formState, setFormState] = useState({
    companyName: '',
    jobTitle: '',
    location: '',
    experience: '',
    description: '',
  });

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobById(jobId));
    }
  }, [dispatch, jobId]);

  useEffect(() => {
    if (jobs && jobId) {
      setFormState({
        companyName: jobs.companyName,
        jobTitle: jobs.jobTitle,
        location: jobs.location,
        experience: jobs.experience,
        description: jobs.description,
      });
    }
  }, [jobs, jobId]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (content) => {
    setFormState({
      ...formState,
      description: content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jobId) {
      dispatch(updateJob({ ...formState, id: jobId }));
    } else {
      dispatch(createJob(formState));
    }
    navigate('/jobs/posted-jobs');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ mt: 4 }}>
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          {jobId ? 'Update Job' : 'Create Job'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="companyName"
              value={formState.companyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formState.jobTitle}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={formState.location}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Experience</InputLabel>
              <Select
                name="experience"
                value={formState.experience}
                onChange={handleChange}
              >
                <MenuItem value="Fresher">Fresher</MenuItem>
                <MenuItem value="1-2 years">1-2 years</MenuItem>
                <MenuItem value="3-5 years">3-5 years</MenuItem>
                <MenuItem value="5+ years">5+ years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            {/* Use RichTextEditor for rich text editing */}
            <RichTextEditor
              value={formState.description}
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {jobId ? 'Update Job' : 'Create Job'}
            </Button>
          </Grid>
        </Grid>
      </StyledForm>
    </Box>
  );
};

export default JobForm;
