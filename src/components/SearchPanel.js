// src/components/SearchPanel.js

import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Grid } from '@mui/material';

const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
];

const SearchPanel = ({ onSearch }) => {
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');

    const handleSearch = () => {
        // Call the onSearch function with the search parameters
        if (onSearch) {
            onSearch({ company, location, jobType });
        }
    };

    return (
        <Box mb={2} sx={{ width: '100%' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Location"
                        variant="outlined"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Job Type"
                        select
                        variant="outlined"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem disabled>Select Job Type</MenuItem>
                        {jobTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        fullWidth
                        sx={{ height: '100%' }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchPanel;
