import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { applyJob, fetchJobById } from '../services/jobService';

export const useJobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const job = useSelector((state) => state.jobs.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);
  return { job, id };
};

export const useApplyJob = (job) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const hasApplied = job?.applicants?.includes(userInfo?._id);

  const handleApply = async (id) => {
    if (hasApplied) {
      setSnackbarMessage('You have already applied for this job');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(
        applyJob({
          jobId: id,
          fullName: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          message: '',
        })
      ).unwrap();

      console.log('Apply Job Response:', response); 

      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error applying for job:', error);
      setSnackbarMessage('Failed to apply for job');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleApply,
    snackbarOpen,
    snackbarMessage,
    loading,
    setSnackbarOpen,
    hasApplied,
  };
};
