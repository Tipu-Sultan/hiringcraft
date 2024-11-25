import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ roles, children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
