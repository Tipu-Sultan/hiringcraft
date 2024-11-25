import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import useProfile from '../hooks/useProfile';
import { updateUserProfile } from '../services/userProfileService';
import { useDispatch } from 'react-redux';

const UserProfileForm = ({ setUserProfileFormStatus, userProfileData }) => {
    const dispatch = useDispatch();
    const {
        message,
        loading,
        snackbarMessage,
        snackbarOpen,
        handleSnackbarClose,
        setSnackbarMessage,
        setSnackbarOpen
    } = useProfile();

    const [userProfileName, setUserProfileName] = useState(userProfileData?.name);
    const [userProfileEmail, setUserProfileEmail] = useState(userProfileData?.email);
    const [userProfileAddress, setUserProfileAddress] = useState(userProfileData?.address);
    const [userProfileMobile, setUserProfileMobile] = useState(userProfileData?.mobile);


    const handleUpdateProfile = (e) => {
        try {
            e.preventDefault();
            const newUserProfileData = {
                name: userProfileName,
                email: userProfileEmail,
                mobile: userProfileMobile,
                address: userProfileAddress
            };
            dispatch(updateUserProfile(newUserProfileData));
            setUserProfileFormStatus(false)
            setSnackbarMessage('Education deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting education:', error);
            setSnackbarMessage('Failed to delete education');
            setSnackbarOpen(true);
        }
    };


    return (
        <form onSubmit={handleUpdateProfile}>
            <TextField
                label="Name"
                value={userProfileName}
                onChange={(e) => setUserProfileName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <TextField
                label="Email"
                value={userProfileEmail}
                onChange={(e) => setUserProfileEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <TextField
                label="Mobile Number"
                value={userProfileMobile}
                onChange={(e) =>setUserProfileMobile(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <TextField
                label="Address"
                value={userProfileAddress}
                onChange={(e) => setUserProfileAddress(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />

            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    Save Changes
                </Button>
                <Button onClick={() => setUserProfileFormStatus(false)} variant="outlined" color="secondary" style={{ marginLeft: '1rem' }}>
                    Cancel
                </Button>
                {message && (
                    <Typography color="primary" style={{ marginTop: '1rem' }}>
                        {message}
                    </Typography>
                )}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Box>
        </form>
    );
};

export default UserProfileForm;
