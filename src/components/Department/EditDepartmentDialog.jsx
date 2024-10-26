import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { editDepartment } from '../../redux/departmentsSlice';


const EditDepartmentDialog = ({ open, handleClose, department }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(department.name);
  const [headDoctor, setHeadDoctor] = useState(department.head_doctor);

  const handleSaveClick = () => {
    const updatedDepartment = {
      ...department,
      name,
      head_doctor: headDoctor,
    };
    
    dispatch(editDepartment(updatedDepartment));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Department</DialogTitle>
      <DialogContent>
        <TextField
          label="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          select
          label="Head of Department"
          value={headDoctor}
          onChange={(e) => setHeadDoctor(e.target.value)}
          fullWidth
          margin="dense"
        >
          {department.doctors?.map((doctor) => (
            <MenuItem key={doctor} value={doctor}>
              {doctor}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDepartmentDialog;
