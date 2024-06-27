import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';

export const useUserAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, userInfo } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    // Redirect if userInfo exists (user logged in successfully)
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
    loading,
  };
};
