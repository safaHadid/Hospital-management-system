import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const RadiographDetailsDialog = ({ open, handleClose, radiograph }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        Radiograph Details
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Radiograph Type:</strong> {radiograph.radiology_type}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Patient Name:</strong> {radiograph.patient_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Doctor Name:</strong> {radiograph.doctor_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Date:</strong> {radiograph.imaging_date}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Results:</strong> {radiograph.results}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Test Status:</strong> {radiograph.status}
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

export default RadiographDetailsDialog;
