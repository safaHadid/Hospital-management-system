import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import axios from "axios";

const AddDoctorDialog = ({ open, handleClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shift, setShift] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [departments, setDepartments] = useState([]);


  useEffect(()=>{
    axios
      .get(`https://endtest.takeittechnology.tech/api/departments`)
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  })


  const handleSubmit = async () => {
    if (firstName && lastName && shift && email && password && phone && address && dateOfBirth && gender && specialization && department && salary) {
      const newDoctor = {
        first_name: firstName,
        last_name: lastName,
        session_period: shift,
        email: email,
        password: password,
        phone_number: phone,
        address: address,
        specialization: specialization,
        department_id: department,
        gender: gender,
        salary: salary,
        role:"doctor",
        date_of_birth: dateOfBirth,
      };
      try {
        await axios.post("https://endtest.takeittechnology.tech/api/admin/doctor", newDoctor);
        handleClose();
        setAddress('');
      setDateOfBirth('');
      setDepartment('');
      setEmail('');
      setFirstName('');
      setGender('');
      setLastName('');
      setPassword('');
      setPhone('');
      setSalary('');
      setShift('');
      setSpecialization('');
      } catch (error) {
        console.error("Error adding:", error);
      }
    } else {
      alert('Please fill all fields.');
    }
  };
  

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Add New Doctor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          select
          label="Shift"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="norning">Morning</MenuItem>
          <MenuItem value="night">Night</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography variant="caption">
            password needs to be more than 8 characters
          </Typography>
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Date of Birth"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Specialization"
          fullWidth
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((department, index) => (
              <MenuItem key={index} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Salary"
          type="number"
          fullWidth
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Doctor
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDoctorDialog;
