import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const EditPatientDialog = ({ open, handleClose, patient }) => {
  const [firstName, setFirstName] = useState(patient.first_name);
  const [lastName, setLastName] = useState(patient.last_name);
  const [idNumber, setIdNumber] = useState(patient.national_number);
  const [phone, setPhone] = useState(patient.phone_number);
  const [address, setAddress] = useState(patient.address);
  const [dateOfBirth, setDateOfBirth] = useState(patient.date_of_birth.substring(0, 10));
  const [room, setRoom] = useState(patient.room);
  const [gender, setGender] = useState(patient.gender);
  const [email, setEmail] = useState(patient.email || "");
  const [password, setPassword] = useState(patient.password);
  const [doctorId, setDoctorId] = useState(patient.doctor_id || [1]);
  const [rooms, setRooms] = useState([]);

  console.log(patient);
  

  useEffect(() => {
    axios
      .get("https://endtest.takeittechnology.tech/api/rooms")
      .then((response) => setRooms(response.data.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleSaveClick = async () => {
    const updatedPatient = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      address: address,
      date_of_birth: dateOfBirth,
      gender: gender,
      password: password,
      doctor_id: doctorId,
      room_id: room,
      national_number: idNumber,
    };
    console.log(updatedPatient);
    

    try {
      await axios.put(
        `https://endtest.takeittechnology.tech/api/patients/${patient.id}`,
        updatedPatient,
        { headers: { Accept: "application/json" } }
      );
      handleClose();
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("An error occurred.");
    }
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
          label="ID Card Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
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
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
          type="password"
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
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          select
          label="Room"
          value={room || ""}
          onChange={(e) => setRoom(e.target.value)}
          fullWidth
          margin="dense"
        >
          {rooms.map((room, index) => (
            <MenuItem key={index} value={room.room_number}>
              {room.room_number}
            </MenuItem>
          ))}
        </TextField>
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
