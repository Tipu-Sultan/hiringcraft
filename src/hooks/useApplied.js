import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelJobApplication, fetchAppliedJobs } from '../services/jobService';



export const useApplied = (userId) => {
  const dispatch = useDispatch();
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);
  const loading = useSelector((state) => state.jobs.loading);
  const error = useSelector((state) => state.jobs.error);

  useEffect(() => {
    dispatch(fetchAppliedJobs(userId));
  }, [dispatch, userId]);

  const handleDeleteJob = (jobId) => {
    dispatch(cancelJobApplication(jobId));
  }

  return {
    appliedJobs,
    loading,
    error,
    handleDeleteJob
  };
};
