import React from 'react';
import { useSelector } from 'react-redux';
import JobPage from '../pages/JobPage';  // Assuming JobPage component exists
import PostedJobsPage from '../pages/PostedJobsPage';  // Assuming PostedJobsPage exists

const RoleBasedPage = () => {
  const userInfo = useSelector(state => state.user.userInfo);

  if (userInfo.role === 'normal') {
    return <JobPage mode="index" />;
  }

  if (userInfo.role === 'employer') {
    return <PostedJobsPage mode="index" />;
  }

  return <div>Unauthorized</div>;  // Handle if no valid role found
};

export default RoleBasedPage;
