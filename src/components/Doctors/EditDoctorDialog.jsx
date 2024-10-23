import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';

const EditDepartmentDialog = ({ open, handleClose, doctor, departments, handleSave }) => {
  const [firstName, setFirstName] = useState(doctor.first_name);
  const [lastName, setLastName] = useState(doctor.last_name);
  const [shift, setShift] = useState(doctor.shift);
  const [email, setEmail] = useState(doctor.email);
  const [phone, setPhone] = useState(doctor.phone);
  const [address, setAddress] = useState(doctor.address);
  const [dateOfBirth, setDateOfBirth] = useState(doctor.date_of_birth);
  const [departmentName, setDepartmentName] = useState(doctor.department_name);
  const [gender, setGender] = useState(doctor.gender);
  const [specialization, setSpecialization] = useState(doctor.specialization);
  const [salary, setSalary] = useState(doctor.salary);

  const handleSaveClick = () => {
    handleSave({
      firstName,
      lastName,
      shift,
      email,
      password,
      phone,
      address,
      dateOfBirth,
      departmentName,
      gender,
      specialization,
      salary,
    });
    handleClose();
  };

  console.log(firstName , lastName , salary);
  
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Doctor</DialogTitle>
      <DialogContent>
        <TextField
          label="Doctor First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Doctor Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          select
          label="Shift"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Morning">Morning</MenuItem>
          <MenuItem value="Night">Night</MenuItem>
        </TextField>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Department"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          fullWidth
          margin="dense"
        >
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.name}>
              {dept.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          label="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDepartmentDialog;
