import React from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import useEducation from '../hooks/useEducation';

const EducationForm = ({setCheckEducationFormStatus}) => {
    const {
        message,
        snackbarMessage,
        snackbarOpen,
        handleSnackbarClose,
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
        handleEducationSubmit
    } = useEducation();
    return (
        <form onSubmit={handleEducationSubmit}>
            <TextField
                label="Course Or Branch Name"
                value={CourseOrBranchName}
                onChange={(e) => setCourseOrBranchName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <TextField
                label="College or University"
                value={collegeOrUniversity}
                onChange={(e) => setCollegeOrUniversity(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <TextField
                label="College or University Address"
                value={collegeOrUniversityAddress}
                onChange={(e) => setCollegeOrUniversityAddress(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <TextField
                label="Passing Year"
                value={passingYear}
                onChange={(e) => setPassingYear(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <TextField
                label="CGPA or Percentage"
                value={cgpaOrPercentage}
                onChange={(e) => setCgpaOrPercentage(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
            />
            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
                <Button onClick={() => setCheckEducationFormStatus(false)} variant="outlined" color="secondary" style={{ marginLeft: '1rem' }}>
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

export default EducationForm;
