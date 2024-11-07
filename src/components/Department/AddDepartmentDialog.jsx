import React, { useEffect, useState } from 'react';
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

import axios from 'axios';

const AddDepartmentDialog = ({ open, handleClose }) => {
  const [departmentName, setDepartmentName] =useState('');
  const [headDoctor, setHeadDoctor] =useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('https://endtest.takeittechnology.tech/api/doctors')
        .then((response) => setDoctors(response.data.data))
        .catch((error) => console.error("Error fetching departments:", error));
}, []);


  const handleSubmit = async () => {
      const newDepartment = {
        name: departmentName,
        head_doctor_id: headDoctor,
      };
      console.log(newDepartment);
      
      try {
        await axios.post(
          "https://endtest.takeittechnology.tech/api/departments",
          newDepartment
        );
      setDepartmentName('');
      setHeadDoctor('');
      handleClose();
      }
      catch (error) {
        console.error("Error adding room:", error);
        alert("An error occurred while adding the room.");
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
              <MenuItem key={index} value={doctor.id}>
                {doctor.first_name} {doctor.last_name}
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
