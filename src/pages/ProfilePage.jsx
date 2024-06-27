// components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import { fetchUserProfileById } from '../services/userProfileService';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
  const { userId } = useParams();
  const [editingIndex, setEditingIndex] = useState(null);
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.userProfile.profileInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    dispatch(fetchUserProfileById(userId));
  }, [dispatch, userId]);



  return (
    <Container maxWidth="md" >
      <UserProfile userId={userId} userInfo={userInfo}  profileInfo={profileInfo} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
    </Container>
  );
};

export default ProfilePage;
