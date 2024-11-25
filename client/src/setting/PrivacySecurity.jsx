import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Avatar } from '@mui/material';

const PrivacySecurity = ({userInfo}) => {
    const [emailVisibility, setEmailVisibility] = useState('private');
    const [mobileVisibility, setMobileVisibility] = useState('private');
    const [resumeVisibility, setResumeVisibility] = useState('employer');

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Privacy & Security
            </Typography>

            <Grid container spacing={3}>
                {/* Profile Information */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            alt={userInfo.name}
                            src={userInfo.profileImage}
                            sx={{ width: 56, height: 56, mr: 2 }}
                        />
                        <Box>
                            <Typography variant="h6">{userInfo.name}</Typography>
                            <Typography variant="body2">{userInfo.email}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="body1"><strong>Mobile:</strong> {userInfo.mobile}</Typography>
                    <Typography variant="body1"><strong>Resume:</strong> {userInfo.resume}</Typography>
                </Grid>

                {/* Privacy Settings */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Email Visibility</InputLabel>
                                <Select
                                    value={emailVisibility}
                                    onChange={(e) => setEmailVisibility(e.target.value)}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="employer">Employer</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Mobile Visibility</InputLabel>
                                <Select
                                    value={mobileVisibility}
                                    onChange={(e) => setMobileVisibility(e.target.value)}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="employer">Employer</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Resume Visibility</InputLabel>
                                <Select
                                    value={resumeVisibility}
                                    onChange={(e) => setResumeVisibility(e.target.value)}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="employer">Employer</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Add more privacy and security settings here if needed */}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PrivacySecurity;
