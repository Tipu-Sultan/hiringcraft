// src/components/PrivateRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ roles }) => {
  const userInfo = useSelector(state => state.user.userInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
