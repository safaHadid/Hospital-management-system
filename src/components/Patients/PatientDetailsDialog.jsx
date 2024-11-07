import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const PatientDetailsDialog = ({ open, handleClose, patient }) => {

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        patient Details
      </DialogTitle>
      <DialogContent>
        <Grid container my={4} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Name:</strong> {patient.first_name} {patient.last_name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>ID Card Number:</strong> {patient.national_number}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Phone:</strong> {patient.phone_number}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Address:</strong> {patient.address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Gender:</strong> {patient.gender}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Date of Birth:</strong> {patient.date_of_birth.substring(0, 10)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Room:</strong> {patient.room}
            </Typography>
          </Grid>
        </Grid>      
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDetailsDialog;
