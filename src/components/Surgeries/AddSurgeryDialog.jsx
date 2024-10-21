import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddSurgeryDialog = ({ open, handleClose, rooms, doctors,surgeryTypes }) => {
  const [patientName, setPatientName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const handleSubmit = () => {
    console.log("Patient Name:", patientName);
    console.log("Room Number:", roomNumber);
    console.log("Surgery Type:", surgeryType);
    console.log("Surgery Date:", surgeryDate);
    console.log("Doctor Name:", doctorName);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Surgery</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Patient Name"
          fullWidth
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Doctor Name</InputLabel>
          <Select
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          >
            {doctors.map((doctor, index) => (
              <MenuItem key={index} value={doctor}>
                {doctor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Room Number</InputLabel>
          <Select
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          >
            {rooms.map((room) => (
              <MenuItem key={room} value={room}>
                {room}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Surgery Type</InputLabel>
          <Select
            value={surgeryType}
            onChange={(e) => setSurgeryType(e.target.value)}
          >
            {surgeryTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Surgery Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setSurgeryDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Surgery
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSurgeryDialog;
