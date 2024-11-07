import React, { useEffect, useState } from "react";
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
  "Colonoscopy",
];

const EditSurgeryDialog = ({ open, handleClose, surgery }) => {
  const [roomNumber, setRoomNumber] = useState(surgery.room_number);
  const [surgeryType, setSurgeryType] = useState(surgery.type_surgery);
  const [surgeryDate, setSurgeryDate] = useState(surgery.date_scheduled);
  const [doctorName, setDoctorName] = useState(surgery.doctor_name || '');
  const [patientName, setPatientName] = useState(surgery.patient_name || '');
  const [patientID, setPatientID] = useState(surgery.patient_id);
  const [doctorID, setDoctorId] = useState(surgery.doctor_id);
  const [roomID, setRoomId] = useState(surgery.room_id);
  const [surgeryStatus, setSurgeryStatus] = useState(surgery.status_surgery);
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `https://endtest.takeittechnology.tech/api/rooms`
        );
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

  const handleSaveClick = async () => {
    const editedSurgery = {
      patient_id: patientID,
      room_id: roomID,
      type_surgery: surgeryType,
      date_scheduled: surgeryDate,
      doctor_id: doctorID,
      status_surgery: surgeryStatus,
    };

    console.log(editedSurgery);
    try {
      await axios.put(
        `https://endtest.takeittechnology.tech/api/surgeries/${surgery.id}`,
        editedSurgery,
        { headers: { Accept: "application/json" } }
      );
      handleClose();
    } catch (error) {
      console.error("Error updating:", error);
      alert("An error occurred.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Surgery</DialogTitle>
      <DialogContent>
      <FormControl fullWidth margin="dense">
          <InputLabel>Room Number</InputLabel>
          <Select
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.room_number} onClick={()=>{setRoomId(room.id)}}>
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
          <InputLabel>Patient Name</InputLabel>
          <Select
            value={patientName}
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={`${patient.first_name} ${patient.last_name}`} onClick={()=>{setPatientID(patient.id); console.log(patient.id);
              }}>
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
              <MenuItem key={index} value={`${doctor.first_name} ${doctor.last_name}`} onClick={()=>{setDoctorId(doctor.id); console.log(doctor.id);
              }} > 
                {doctor.first_name} {doctor.last_name}
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
            <MenuItem value="scheduled">Scheduled</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Canceled</MenuItem>
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
