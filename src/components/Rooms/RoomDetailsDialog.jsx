import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const RoomDetailsDialog = ({ open, handleClose, room }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        Room Details
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Room ID:</strong> {room.id}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Room Number:</strong> {room.room_number}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Room Type:</strong> {room.room_type}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Department Name:</strong> {room.department_name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Room Status: </strong> 
                    {room.status}
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

export default RoomDetailsDialog;
