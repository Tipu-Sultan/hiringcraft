import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { applyJob, fetchJobById } from '../services/jobService';
import { enqueueSnackbar } from 'notistack';
import useAuthData from './useAuthData';

export const useDetailsAndApplyJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useAuthData();
  const [loading, setLoading] = useState(false);
  const { jobs, getJob } = useSelector((state) => state.jobs);

  const job = jobs?.find((job) => job._id === id) || getJob;

  useEffect(() => {
    if (id && Object.keys(job).length === 0) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, getJob, id, job]);

  const hasApplied = job?.applicants?.includes(user?._id);


  const handleApply = async (id) => {
    if (hasApplied) {
      return enqueueSnackbar('You have already applied for this job');
    }
    setLoading(true);

    try {
      const response = await dispatch(
        applyJob({
          jobId: id,
          fullName: user.name,
          email: user.email,
          phone: user.phone,
          message: '',
        })
      ).unwrap();

      enqueueSnackbar(response.message);
    } catch (error) {
      console.error('Error applying for job:', error);
      enqueueSnackbar(error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleApply,
    loading,
    hasApplied,
    job, getJob, id
  };
};
