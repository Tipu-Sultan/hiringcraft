import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {handlerProjectDelete, updateUserProjectProfile } from '../services/userProfileService';

const useProject = () => {
    const dispatch = useDispatch();

    const [projectData, setProjectData] = useState(false);
    const [checkProjectFormStatus, setCheckProjectFormStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const [projectTitle, setProjectTitle] = useState('');
    const [projectDuration, setProjectDuration] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectCodeOrHostLink, setProjectCodeOrHostLink] = useState('');


    const handleProjectEdit = (data) => {
        setProjectData(data);
        setCheckProjectFormStatus(true);
    };



    const handleProjectDelete = async (proId) => {
        try {
            dispatch(handlerProjectDelete(proId));
            setSnackbarMessage('Education deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting education:', error);
            setSnackbarMessage('Failed to delete education');
            setSnackbarOpen(true);
        }
    };



    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };



    const handleProjectSubmit = (e) => {
        e.preventDefault();
        const updatedProject = {
            projectTitle,
            projectDuration,
            projectDescription,
            projectCodeOrHostLink,
        };
        dispatch(updateUserProjectProfile({ updatedProject }));
        setCheckProjectFormStatus(false);
    };



    return {
        projectData,
        snackbarMessage,
        snackbarOpen,
        handleSnackbarClose,
        setSnackbarMessage,
        setSnackbarOpen,
        checkProjectFormStatus,
        projectTitle,
        projectDuration,
        projectDescription,
        projectCodeOrHostLink,
        setProjectTitle,
        setProjectDuration,
        setProjectDescription,
        setProjectCodeOrHostLink,
        setCheckProjectFormStatus,
        handleProjectDelete,
        handleProjectSubmit,
        handleProjectEdit
    };
};

export default useProject;
