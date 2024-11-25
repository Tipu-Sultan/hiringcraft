import React, { useState } from 'react';
import { Typography, Paper, Grid, Divider, IconButton, Button, Avatar, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, PhotoCamera } from '@mui/icons-material';
import EducationForm from './EducationForm';
import ExperianceForm from './ExperianceForm';
import ProjectForm from './ProjectForm';
import UserProfileForm from './UserProfileForm';
import useProfile from '../hooks/useProfile';
import useEducation from '../hooks/useEducation';
import useExperiance from '../hooks/useExperiance';
import useProject from '../hooks/useProject';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../services/userProfileService';

const UserProfile = ({ userId, userInfo, profileInfo }) => {
  const dispatch = useDispatch();
  const {
    checkEducationFormStatus,
    setCheckEducationFormStatus,
    handleEducationEdit,
    handleEducationDelete,
  } = useEducation();

  const {
    checkExperienceFormStatus,
    setCheckExperienceFormStatus,
    handleExperianceDelete,
    handleExperianceEdit,
  } = useExperiance();


  const {
    checkProjectFormStatus,
    setCheckProjectFormStatus,
    handleProjectDelete,
    handleProjectEdit,
  } = useProject();

  const { userProfileData, setUserProfileData, userProfileFormStatus, setUserProfileFormStatus } = useProfile();

  const { loading, error, message } = useSelector((state) => state.userProfile);


  const handleProfileEdit = (data) => {
    setUserProfileData(data);
    setUserProfileFormStatus(true);
  };

  const [selectedImage, setSelectedImage] = useState(profileInfo?.profileImage || '');
  const [CheckselectedImage, setCheckSelectedImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setCheckSelectedImage(true);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleToUploadProfileImg = (e) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append('profileImage', imageFile);
      dispatch(updateUserProfile(formData));
    }
  };

  return (
    <Grid spacing={4} style={{ padding: '20px', marginBottom: '10px' }}>
      <Grid item xs={12} sm={6} md={4} mb={2}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
          <Avatar
            src={CheckselectedImage ? selectedImage : profileInfo?.profileImage}
            alt={profileInfo?.name || 'User'}
            sx={{ width: 100, height: 100, margin: '0 auto' }}
          >
            {profileInfo?.name ? profileInfo.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <IconButton
            color="primary"
            component="label"
            style={{
              position: 'absolute',
              top: 85,
              left: 'calc(50% + 35px)',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '5px',
            }}
          >
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            <PhotoCamera />
          </IconButton>
          {CheckselectedImage && (
            <Button disabled={loading} onClick={handleToUploadProfileImg}>
              {loading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
          )}

          <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '20px', fontWeight: 'bold' }}>
            {profileInfo?.name}
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Name: {profileInfo?.name}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '5px' }}>
            <strong>Email:</strong> {profileInfo?.email}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '5px' }}>
            <strong>Contact Number:</strong> {profileInfo?.mobile}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            <strong>Address:</strong> {profileInfo?.address}
          </Typography>
          {userProfileFormStatus && (
            <UserProfileForm userProfileData={userProfileData} setUserProfileFormStatus={setUserProfileFormStatus} />
          )}
          {userInfo?._id === userId && !userProfileFormStatus && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleProfileEdit(profileInfo)}
              style={{ marginTop: '20px' }}
            >
              Edit Profile
            </Button>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <strong>Education</strong>
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          {profileInfo?.education &&
            profileInfo?.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <Typography variant="subtitle1"><strong>{edu?.CourseOrBranchName}</strong></Typography>
                <Typography variant="subtitle1">{edu?.collegeOrUniversity}</Typography>
                <Typography variant="body2">{edu?.passingYear}</Typography>
                <Typography variant="body2">{edu?.cgpaOrPercentage}</Typography>
                <Typography variant="body2">{edu?.collegeOrUniversityAddress}</Typography>
                {userInfo?._id === userId && (
                  <>
                    <IconButton onClick={() => handleEducationEdit(edu)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEducationDelete(edu._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
                <Divider />
              </div>
            ))}
          {checkEducationFormStatus && (
            <EducationForm setCheckEducationFormStatus={setCheckEducationFormStatus} />
          )}
          {userInfo?._id === userId && !checkEducationFormStatus && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCheckEducationFormStatus(true)}
              style={{ marginTop: '20px' }}
            >
              Add Education
            </Button>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <strong>Projects</strong>
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          {profileInfo?.projects &&
            profileInfo?.projects.map((project, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <Typography variant="subtitle1"><strong>{project.projectTitle}</strong></Typography>
                <Typography variant="body2">{project.projectDuration}</Typography>
                <Typography variant="body2">{project.projectDescription}</Typography>
                <Typography variant="body2">{project.projectCodeOrHostLink}</Typography>
                {userInfo?._id === userId && (
                  <>
                    <IconButton onClick={() => handleProjectEdit(project)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleProjectDelete(project._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
                <Divider />
              </div>
            ))}
          {checkProjectFormStatus && (
            <ProjectForm setCheckProjectFormStatus={setCheckProjectFormStatus} />
          )}
          {userInfo?._id === userId && !checkProjectFormStatus && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCheckProjectFormStatus(true)}
              style={{ marginTop: '20px' }}
            >
              Add Project
            </Button>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <strong>Experience</strong>
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          {profileInfo?.experience &&
            profileInfo?.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <Typography variant="subtitle1"><strong>{exp.companyName}</strong></Typography>
                <Typography variant="body2">{exp.jobProfile}</Typography>
                <Typography variant="body2">{exp.jobType}</Typography>
                <Typography variant="body2">{exp.jobDescription}</Typography>
                {userInfo?._id === userId && (
                  <>
                    <IconButton onClick={() => handleExperianceEdit(exp)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleExperianceDelete(exp._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </div>
            ))}
          {checkExperienceFormStatus && (
            <ExperianceForm
              setCheckExperienceFormStatus={setCheckExperienceFormStatus}
            />
          )}
          {userInfo?._id === userId && !checkExperienceFormStatus && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCheckExperienceFormStatus(true)}
              style={{ marginTop: '20px' }}
            >
              Add Experience
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
