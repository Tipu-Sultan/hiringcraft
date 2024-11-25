import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobApplicants } from '../services/jobService';

export const useApplicants = (jobId) => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.postedBy.postedBy);
  console.log(applicants)
  const loading = useSelector((state) => state.postedBy.loading);
  const error = useSelector((state) => state.postedBy.error);

  useEffect(() => {
    dispatch(fetchJobApplicants(jobId));
  }, [dispatch, jobId]);

  return {
    applicants,
    loading,
    error,
  };
};


