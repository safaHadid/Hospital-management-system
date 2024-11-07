import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';

const EditDepartmentDialog = ({ open, handleClose, doctor, handleSave }) => {
  const [firstName, setFirstName] = useState(doctor.first_name);
  const [lastName, setLastName] = useState(doctor.last_name);
  const [shift, setShift] = useState(doctor.session_period);
  const [email, setEmail] = useState(doctor.email);
  const [password, setPassword] = useState(doctor.password);
  const [phone, setPhone] = useState(doctor.phone_number);
  const [address, setAddress] = useState(doctor.address);
  const [dateOfBirth, setDateOfBirth] = useState(doctor.date_of_birth.substring(0, 10));
  const [departmentName, setDepartmentName] = useState(doctor.department);
  const [departmentID, setDepartmentID] = useState();
  const [gender, setGender] = useState(doctor.gender);
  const [specialization, setSpecialization] = useState(doctor.specialization);
  const [departments, setDepartments] = useState([]);


  useEffect(()=>{
    axios
      .get(`https://endtest.takeittechnology.tech/api/departments`)
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  })


  const handleSaveClick = async () => {
    const updatedDoctor = {
      ...doctor,
      first_name: firstName,
        last_name: lastName,
        session_period: shift,
        email: email,
        password:password,
        phone_number: phone,
        address: address,
        specialization: specialization,
        department_id: departmentID,
        gender: gender,
        role:"doctor",
        date_of_birth: dateOfBirth,
    };
    console.log({ firstName, lastName, shift, email, phone, address, dateOfBirth, gender, specialization, departmentName });


    try {
      await axios.put(
        `https://endtest.takeittechnology.tech/api/doctors/${doctor.id}`,
        updatedDoctor
      );
    }
    catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
    handleClose();
  };

  
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
          <MenuItem value="morning">Morning</MenuItem>
          <MenuItem value="night">Night</MenuItem>
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
            <MenuItem key={dept.id} value={dept.name} onClick={()=>setDepartmentID(dept.id)}>
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
          <MenuItem value="male">male</MenuItem>
          <MenuItem value="female">female</MenuItem>
        </TextField>
        <TextField
          label="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
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
