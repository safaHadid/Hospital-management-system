import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddDepartmentDialog = ({ open, handleClose }) => {
  const [departmentName, setDepartmentName] = React.useState('');
  const [headDoctor, setHeadDoctor] = React.useState('');

  const doctors = [
    "Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Taylor"
  ];

  const handleSubmit = () => {
    console.log("Department Name:", departmentName);
    console.log("Head Doctor Name:", headDoctor);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Department</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Department Name"
          fullWidth
          value={departmentName}
          onChange={(e)=>{setDepartmentName(e.target.value)}}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Head of Department</InputLabel>
          <Select
            value={headDoctor}
            onChange={(e)=>{setHeadDoctor(e.target.value)}}
            label="Head of Department"
          >
            {doctors.map((doctor, index) => (
              <MenuItem key={index} value={doctor}>
                {doctor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Department
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDepartmentDialog;
