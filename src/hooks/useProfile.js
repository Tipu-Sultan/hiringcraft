import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useProfile = () => {
    const { message, loading } = useSelector((state) => state.user);
    const [userProfileData, setUserProfileData] = useState(null);
    const [userProfileFormStatus, setUserProfileFormStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return {
        message,
        loading,
        userProfileData,
        userProfileFormStatus,
        snackbarMessage,
        snackbarOpen,
        setUserProfileData,
        setUserProfileFormStatus,
        setSnackbarMessage,
        setSnackbarOpen,
        handleSnackbarClose
    };
};

export default useProfile;
