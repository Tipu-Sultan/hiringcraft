import React, { useState } from 'react';
import { Typography, Box, Paper, Button, Modal, Backdrop, Fade, Grid, TextField, Divider } from '@mui/material';

const DangerZone = ({userInfo}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenDeactivateModal = () => {
    setOpenDeactivateModal(true);
  };

  const handleCloseDeactivateModal = () => {
    setOpenDeactivateModal(false);
  };

  const handleOpenEmailModal = () => {
    setOpenEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setOpenEmailModal(false);
    setNewEmail('');
  };

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    console.log("Account deleted");
    handleCloseDeleteModal();
  };

  const handleDeactivateAccount = () => {
    // Add account deactivation logic here
    console.log("Account deactivated");
    handleCloseDeactivateModal();
  };

  const handleEmailSubmit = () => {
    // Handle email change logic here
    console.log("Email changed to:", newEmail);
    handleCloseEmailModal();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: '#ffebee', borderRadius: 2 }}>
      <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
        Danger Zone
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
        Be careful! These actions are irreversible.
      </Typography>

      {/* Delete Account Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth
            onClick={handleOpenDeleteModal}
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
            onClick={handleOpenDeactivateModal}
            sx={{
              p: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#fff3e0' },
            }}
          >
            Deactivate Account
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Switch/Add Email Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button 
            variant="outlined" 
            color="primary"
            fullWidth
            onClick={handleOpenEmailModal}
            sx={{
              p: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#e0f7fa' },
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
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeleteModal}>
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
                onClick={handleCloseDeleteModal}
                sx={{ fontWeight: 'bold' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Deactivate Account Modal */}
      <Modal
        aria-labelledby="deactivate-account-modal-title"
        aria-describedby="deactivate-account-modal-description"
        open={openDeactivateModal}
        onClose={handleCloseDeactivateModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeactivateModal}>
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
            <Typography id="deactivate-account-modal-title" variant="h6" component="h2">
              Confirm Account Deactivation
            </Typography>
            <Typography id="deactivate-account-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to deactivate your account? You can reactivate it later.
            </Typography>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button 
                variant="contained" 
                color="warning"
                onClick={handleDeactivateAccount}
                sx={{ fontWeight: 'bold' }}
              >
                Deactivate
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleCloseDeactivateModal}
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
        open={openEmailModal}
        onClose={handleCloseEmailModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEmailModal}>
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
                onClick={handleCloseEmailModal}
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
