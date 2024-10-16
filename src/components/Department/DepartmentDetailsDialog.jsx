import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';

const DepartmentDetailsDialog = ({ open, handleClose, department }) => {

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        Department Details
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Department ID:</strong> {department.id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Department Name:</strong> {department.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Total Rooms:</strong> {department.number_of_rooms}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Head of Department:</strong> {department.head_doctor}
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Doctors ({department.doctors.length})
        </Typography>
        <List sx={{ bgcolor: 'background.paper', mb: 2 }}>
          {department.doctors.map((doctor, index) => (
            <ListItem key={index} sx={{ bgcolor: index % 2 === 0 ? 'action.hover' : 'inherit' }}>
              {doctor}
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" gutterBottom>
          Nurses ({department.nurses.length})
        </Typography>
        <List sx={{ bgcolor: 'background.paper' }}>
          {department.nurses.map((nurse, index) => (
            <ListItem key={index} sx={{ bgcolor: index % 2 === 0 ? 'action.hover' : 'inherit' }}>
              {nurse}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentDetailsDialog;
