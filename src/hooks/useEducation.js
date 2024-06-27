import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handlerEduCationDelete, updateUserEducationProfile} from '../services/userProfileService';

const useEducation = () => {
  const [userProfileData, setUserProfileData] = useState(null);
  const [educationIndexData, setEducationIndexData] = useState(null);
  const [checkEducationFormStatus, setCheckEducationFormStatus] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [CourseOrBranchName, setCourseOrBranchName] = useState('');
  const [collegeOrUniversity, setCollegeOrUniversity] = useState('');
  const [collegeOrUniversityAddress, setCollegeOrUniversityAddress] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [cgpaOrPercentage, setCgpaOrPercentage] = useState('');

  const dispatch = useDispatch();

  const handleEducationEdit = (data) => {
    setEducationIndexData(data);
    setCheckEducationFormStatus(true);
  };


  const handleEducationDelete = async (eduId) => {
    try {
      dispatch(handlerEduCationDelete(eduId));
      setSnackbarMessage('Education deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting education:', error);
      setSnackbarMessage('Failed to delete education');
      setSnackbarOpen(true);
    }
  };

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    const updatedEducation = {
      CourseOrBranchName,
      collegeOrUniversity,
      collegeOrUniversityAddress,
      passingYear,
      cgpaOrPercentage,
    };
    dispatch(updateUserEducationProfile({ updatedEducation }));
    setCheckEducationFormStatus(false);
  };



  return {
    userProfileData,
    educationIndexData,
    checkEducationFormStatus,
    snackbarMessage,
    snackbarOpen,
    CourseOrBranchName,
    collegeOrUniversity,
    collegeOrUniversityAddress,
    passingYear,
    cgpaOrPercentage,
    setCourseOrBranchName,
    setCollegeOrUniversity,
    setCollegeOrUniversityAddress,
    setPassingYear,
    setCgpaOrPercentage,
    setUserProfileData,
    setEducationIndexData,
    setCheckEducationFormStatus,
    setSnackbarMessage,
    setSnackbarOpen,
    handleEducationEdit,
    handleEducationDelete,
    handleEducationSubmit
  };
};

export default useEducation;
