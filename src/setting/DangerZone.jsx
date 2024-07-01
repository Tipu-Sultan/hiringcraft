import React, { useState } from 'react';
import { Typography, Box, Paper, Button, Modal, Backdrop, Fade, Grid, TextField } from '@mui/material';

const DangerZone = ({userInfo}) => {
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailChangeOpen, setEmailChangeOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmailChangeOpen(false);
  };

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    console.log("Account deleted");
    handleClose();
  };

  const handleEmailChange = () => {
    setEmailChangeOpen(true);
  };

  const handleEmailSubmit = () => {
    // Handle email change logic here
    console.log("Email changed to:", newEmail);
    handleClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: '#ffebee', borderRadius: 2 }}>
      <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
        Danger Zone
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
        Be careful! These actions are irreversible.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth
            onClick={handleOpen}
            sx={{
              p: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#d32f2f' },
            }}
          >
            Delete Account
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button 
            variant="outlined" 
            color="warning"
            fullWidth
            onClick={handleEmailChange}
            sx={{
              p: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#fff3e0' },
            }}
          >
            Switch/Add Email
          </Button>
        </Grid>
      </Grid>

      {/* Delete Account Modal */}
      <Modal
        aria-labelledby="delete-account-modal-title"
        aria-describedby="delete-account-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="delete-account-modal-title" variant="h6" component="h2">
              Confirm Account Deletion
            </Typography>
            <Typography id="delete-account-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete your account? This action cannot be undone.
            </Typography>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button 
                variant="contained" 
                color="error"
                onClick={handleDeleteAccount}
                sx={{ fontWeight: 'bold' }}
              >
                Delete
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleClose}
                sx={{ fontWeight: 'bold' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Email Change Modal */}
      <Modal
        aria-labelledby="email-change-modal-title"
        aria-describedby="email-change-modal-description"
        open={emailChangeOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={emailChangeOpen}>
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="email-change-modal-title" variant="h6" component="h2">
              Switch/Add Email
            </Typography>
            <Typography id="email-change-modal-description" sx={{ mt: 2 }}>
              Enter your new email address:
            </Typography>
            <TextField
              id="new-email"
              label="New Email"
              variant="outlined"
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleEmailSubmit}
                sx={{ fontWeight: 'bold' }}
              >
                Save
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleClose}
                sx={{ fontWeight: 'bold' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Paper>
  );
};

export default DangerZone;
