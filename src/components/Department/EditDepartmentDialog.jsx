import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';


const EditDepartmentDialog = ({ open, handleClose, department }) => {
  const [name, setName] = useState(department.name);
  const [headDoctor, setHeadDoctor] = useState(department.head_doctor);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (department) {
      setName(department.name);
      setHeadDoctor(department.head_doctor_id);
    }
  }, [department]);
  

  useEffect(() => {
    axios.get('https://endtest.takeittechnology.tech/api/doctors')
        .then((response) => setDoctors(response.data.data))
        .catch((error) => console.error("Error fetching departments:", error));
}, []);

  const handleSaveClick = async () => {
    const updatedDepartment = {
      ...department,
      name,
      head_doctor_id: headDoctor,
    };
    console.log(updatedDepartment);
    
    
    try {
      await axios.put(
        `https://endtest.takeittechnology.tech/api/departments/${department.id}`,
        updatedDepartment
      );
    setName('');
    setHeadDoctor('');
    handleClose();
    }
    catch (error) {
      console.error("Error adding room:", error);
      alert("An error occurred while adding the room.");
    }
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
          <MenuItem value="">
              <em>None</em>
            </MenuItem>
          {doctors?.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.first_name} {doctor.last_name}
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
