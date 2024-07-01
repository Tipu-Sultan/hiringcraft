import React, { useState } from 'react';
import { Box, Button, TextField, Chip, Grid, CircularProgress, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filterJobs } from '../services/jobService';

const jobTypes = [
    { value: 'Php Developer', label: 'Php Developer' },
    { value: 'Web Developer', label: 'Web Developer' },
    { value: 'React Developer', label: 'React Developer' },
];

const SearchPanel = () => {
    const [companyInput, setCompanyInput] = useState([]);
    const [location, setLocation] = useState('');
    const [jobProfileType, setJobProfileType] = useState('');
    const { loading } = useSelector((state) => state.jobs);

    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = {};
        if (companyInput.length > 0) searchParams.company = companyInput;
        if (location) searchParams.location = location;
        if (jobProfileType) searchParams.jobProfileType = jobProfileType;

        dispatch(filterJobs(searchParams));
    };

    return (
        <Box mb={2} sx={{ width: '100%' }}>
            <form onSubmit={handleSearch}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={[]}
                            value={companyInput}
                            onChange={(event, newValue) => setCompanyInput(newValue)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Company Name"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Location"
                            name="location"
                            variant="outlined"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={jobTypes}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Job Type"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                            value={jobTypes.find(option => option.value === jobProfileType) || null}
                            onChange={(event, newValue) => {
                                setJobProfileType(newValue ? newValue.value : '');
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ height: '100%' }}
                            type="submit"
                        >
                            {loading ? <CircularProgress size={24} /> : 'Search'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default SearchPanel;
