import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment } from '../../redux/departmentsSlice';

const AddDepartmentDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [departmentName, setDepartmentName] = React.useState('');
  const [headDoctor, setHeadDoctor] = React.useState('');

  const doctors = useSelector((state)=> state.department.doctors);

  const handleSubmit = () => {
    if (departmentName && headDoctor) {
      const newDepartment = {
        id: Date.now(),
        name: departmentName,
        number_of_rooms: 0,
        head_doctor: headDoctor,
        doctors: [],
      };
      dispatch(addDepartment(newDepartment));
      console.log(newDepartment);
      setDepartmentName('');
      setHeadDoctor('');
      handleClose();
    } else {
      alert('Please enter both department name and head doctor.');
    }
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
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Head of Department</InputLabel>
          <Select
            value={headDoctor}
            onChange={(e) => setHeadDoctor(e.target.value)}
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
