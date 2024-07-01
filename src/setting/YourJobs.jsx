import React from 'react';
import { Typography, Container, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useApplied } from '../hooks/useApplied';

const YourJobs = () => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const { appliedJobs } = useApplied(userInfo?._id);

    return (
        <Container sx={{ mt: 4 }}>
            {appliedJobs?.length === 0 ? (
                <Typography variant="body1">You haven't applied to any jobs yet.</Typography>
            ) : (
                <List>
                    {appliedJobs?.map((job) => (
                        <ListItem key={job._id} disablePadding>
                            <ListItemText
                                primary={job.jobTitle}
                                secondary={`${job.companyName} | ${job.location}`}
                            />
                            <ListItemSecondaryAction>
                                <Button
                                    component={Link}
                                    to={`/jobs/${job._id}`}
                                    variant="contained"
                                    color="primary"
                                >
                                    View Job
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default YourJobs;
