import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelJobApplication, fetchAppliedJobs } from '../services/jobService';
import { enqueueSnackbar } from 'notistack';



export const useApplied = (userId) => {
  const dispatch = useDispatch();
  const {appliedJobs,loading,error,message} = useSelector((state) => state.jobs);

  useEffect(() => {
    if(appliedJobs.length===0){
      dispatch(fetchAppliedJobs(userId));
    }
  }, [appliedJobs.length, dispatch, userId]);
  
  const handleDeleteJob = (jobId) => {
    dispatch(cancelJobApplication(jobId));
    enqueueSnackbar(message|| 'Application has been cancelled');

  }

  return {
    appliedJobs,
    loading,
    error,
    message,
    handleDeleteJob
  };
};
