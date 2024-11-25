import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handlerEduCationDelete, handlerExperianceDelete, updateUserExperianceProfile } from '../services/userProfileService';

const useExperiance = () => {
  const [checkExperienceFormStatus, setCheckExperienceFormStatus] = useState(false);
  const [experienceData, setExperienceData] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [jobProfile, setJobProfile] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const dispatch = useDispatch();

  const handleExperianceEdit = (data) => {
    setExperienceData(data);
    setCheckExperienceFormStatus(true);
  };


  const handleExperianceDelete = async (exId) => {
    try {
      dispatch(handlerExperianceDelete(exId));
      setSnackbarMessage('Experiene deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting education:', error);
      setSnackbarMessage('Failed to delete Experiene');
      setSnackbarOpen(true);
    }
  };



  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    const updatedExperience = {
      companyName,
      jobProfile,
      jobType,
      jobDescription,
    };
    dispatch(updateUserExperianceProfile({ updatedExperience }));
    setCheckExperienceFormStatus(false);
  };

  return {
    checkExperienceFormStatus,
    experienceData,
    snackbarMessage,
    snackbarOpen,
    companyName,
    jobProfile,
    jobType,
    jobDescription,
    setCompanyName,
    setJobProfile,
    setJobType,
    setJobDescription,
    setCheckExperienceFormStatus,
    setSnackbarMessage,
    setSnackbarOpen,
    handleSnackbarClose,
    handleExperienceSubmit,
    handleExperianceDelete,
    handleExperianceEdit,
  };
};

export default useExperiance;
