import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, fetchJobspostedBy } from '../services/jobService';

export const usePostedJobs = (postedBy) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.postedBy.postedBy);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchJobspostedBy(postedBy));
  }, [dispatch,postedBy]);

  const handleDeleteJob = async (jobId) => {
    try {
      dispatch(deleteJob(jobId));
      setSnackbarMessage('Job deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting job:', error);
      setSnackbarMessage('Failed to delete job');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    jobs,
    snackbarOpen,
    snackbarMessage,
    handleDeleteJob,
    handleSnackbarClose,
  };
};
