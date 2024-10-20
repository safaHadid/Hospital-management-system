import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const EditPatientDialog = ({
  open,
  handleClose,
  patient,
  departments,
  handleSave,
}) => {
  const [firstName, setFirstName] = useState(patient.first_name);
  const [lastName, setLastName] = useState(patient.last_name);
  const [phone, setPhone] = useState(patient.phone);
  const [address, setAddress] = useState(patient.address);
  const [dateOfBirth, setDateOfBirth] = useState(patient.date_of_birth);
  const [departmentName, setDepartmentName] = useState(patient.department);
  const [room, setRoom] = useState(patient.room);
  const [gender, setGender] = useState(patient.gender);
  const [discharged, setDischarged] = useState(patient.discharged || false);

  const handleSaveClick = () => {  
    console.log(firstName,lastName,phone,address,dateOfBirth,departmentName,room,gender,discharged);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
          label="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          fullWidth
          margin="dense"
        >
          {departments
            .find((department) => department.name === departmentName)
            ?.rooms.map((room, index) => (
              <MenuItem key={index} value={room.roomNumber}>
                {room.roomNumber}
              </MenuItem>
            ))}
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={discharged}
              onChange={(e) => setDischarged(e.target.checked)}
            />
          }
          label="Discharged"
        />
        {/* <TextField
          select
          label="Discharge Status"
          value={discharged ? "discharged" : "not_discharged"}
          onChange={(e) => setDischarged(e.target.value === "discharged")}
          fullWidth
          margin="dense"
        >
          <MenuItem value="not_discharged">Not Discharged</MenuItem>
          <MenuItem value="discharged">Discharged</MenuItem>
        </TextField> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPatientDialog;
