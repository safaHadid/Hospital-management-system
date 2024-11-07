import React, { useEffect, useState } from "react";
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
import axios from "axios";

const surgeryTypes = [
  "Appendectomy",
  "Cholecystectomy",
  "Hernia Repair",
  "Knee Replacement",
  "Hip Replacement",
  "Coronary Bypass",
  "Gallbladder Removal",
  "Mastectomy",
  "Prostatectomy",
  "Laparoscopic Surgery",
  "Cataract Surgery",
  "Spinal Fusion",
  "Carpal Tunnel Release",
  "Bariatric Surgery",
  "Endoscopy",
  "Colonoscopy"
];


const AddSurgeryDialog = ({ open, handleClose }) => {
  const [patientName, setPatientName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [surgeryStatus, setSurgeryStatus] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);


useEffect(() => {
  const fetchRooms = async () => {
    try {
      const response = await axios.get(`https://endtest.takeittechnology.tech/api/rooms`);
      setRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  fetchRooms();
}, []);

useEffect(() => {
  const fetchPatients = () => {
    axios
      .get(`https://endtest.takeittechnology.tech/api/patients`)
      .then((response) => {
        setPatients(response.data.data);
      })
      .catch((error) => console.error("Error fetching:", error));
  };
  fetchPatients();
}, []);

useEffect(() => {
  const fetchDoctors = () => {
    axios
      .get(`https://endtest.takeittechnology.tech/api/doctors`)
      .then((response) => {
        setDoctors(response.data.data);
      })
      .catch((error) => console.error("Error fetching:", error));
  };
  fetchDoctors();
}, []);

  const handleSubmit = async () => {
    const newSurgery = {
      patient_id: patientName,
      doctor_id: doctorName,
      room_id: roomNumber,
      type_surgery : surgeryType,
      date_scheduled: surgeryDate,
      status_surgery: surgeryStatus,
    };
    console.log(newSurgery);
    
    try {
      await axios.post(
        "https://endtest.takeittechnology.tech/api/surgeries",
        newSurgery,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      handleClose();
    } catch (error) {
      console.error("Error adding:", error);
      alert("An error occurred.");
    }
  };
  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Surgery</DialogTitle>
      <DialogContent>
      <FormControl fullWidth margin="dense">
          <InputLabel>Patient Name</InputLabel>
          <Select
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          >
            {patients.map((patient, index) => (
              <MenuItem key={index} value={patient.id}>
                {patient.first_name} {patient.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Doctor Name</InputLabel>
          <Select
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          >
            {doctors.map((doctor, index) => (
              <MenuItem key={index} value={doctor.id}>
                {doctor.first_name} {doctor.last_name}
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
              <MenuItem key={room.id} value={room.id}>
                {room.room_number}
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

        <FormControl fullWidth margin="dense">
          <InputLabel>Surgery Status</InputLabel>
          <Select
            value={surgeryStatus}
            onChange={(e) => setSurgeryStatus(e.target.value)}
          >
              <MenuItem value={"scheduled"}>
              scheduled
              </MenuItem>
              <MenuItem value={"cancelled"}>
              cancelled
              </MenuItem>
              <MenuItem value={"completed"}>
              completed
              </MenuItem>
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
