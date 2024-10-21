import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const EditSurgeryDialog = ({
  open,
  handleClose,
  surgery,
  doctors,
  handleSave,
  surgeryTypes
}) => {
  const [roomNumber, setRoomNumber] = useState(surgery.roomNumber);
  const [surgeryType, setSurgeryType] = useState(surgery.surgery_type);
  const [surgeryDate, setSurgeryDate] = useState(surgery.surgery_date);
  const [doctorName, setDoctorName] = useState(surgery.doctor_name);
  const [surgeryStatus, setSurgeryStatus] = useState(surgery.surgery_status);

  const handleSaveClick = () => {
    const editedSurgery = {
      id: surgery.id,
      patient_name: surgery.patient_name,
      roomNumber: roomNumber,
      surgery_type: surgeryType,
      surgery_date: surgeryDate,
      doctor_name: doctorName,
      surgery_status: surgeryStatus,
    };

    console.log(editedSurgery);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Surgery</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Room Number"
          fullWidth
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />

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
          value={surgeryDate}
          onChange={(e) => setSurgeryDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
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
          <InputLabel>Surgery Status</InputLabel>
          <Select
            value={surgeryStatus}
            onChange={(e) => setSurgeryStatus(e.target.value)}
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </Select>
        </FormControl>
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

export default EditSurgeryDialog;
