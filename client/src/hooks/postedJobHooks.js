import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, fetchJobspostedBy } from '../services/jobService';

export const usePostedJobs = (postedId) => {
  const dispatch = useDispatch();
  const {postedBy,getJob,formState,loading,error} = useSelector((state) => state.postedBy);
  const posted = postedBy.find(job => job._id===postedId) || getJob;

  useEffect(() => {
    if(postedBy.length===0){
      dispatch(fetchJobspostedBy(postedId));
    }
  }, [dispatch, postedBy.length, postedId]);

  const handleDeleteJob = async (jobId) => {
    try {
      dispatch(deleteJob(jobId));
    } catch (error) {
      console.error('Error deleting job:', error);

    }
  };

 

  return {
    postedBy,
    posted,
    formState,
    loading,
    error,
    handleDeleteJob,
  };
};
