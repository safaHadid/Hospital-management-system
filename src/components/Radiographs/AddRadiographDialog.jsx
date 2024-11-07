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

const AddRadiographDialog = ({
  open,
  handleClose,
  radiographTypes,
}) => {
  const [patientName, setPatientName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [radiographType, setRadiographType] = useState("");
  const [imagingDate, setImagingDate] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

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
    const newRay = {
      patient_id : patientID,
      doctor_id : doctorID,
      radiology_type : radiographType,
      imaging_date : imagingDate,
      status : status,
      result : result
    }
    console.log(newRay);
    try {
      await axios.post(
        "https://endtest.takeittechnology.tech/api/rays",
        newRay,
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
      <DialogTitle>Add New Radiograph Record</DialogTitle>
      <DialogContent>

        <FormControl fullWidth margin="dense">
          <InputLabel>Patient Name</InputLabel>
          <Select
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          >
            {patients.map((patient, index) => (
              <MenuItem key={index} value={`{patient.first_name} {patient.last_name}`} onClick={()=>{setPatientID(patient.id)}}>
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
              <MenuItem key={index} value={`{doctor.first_name} {doctor.last_name}`} onClick={()=>{setDoctorID(doctor.id)}}>
                {doctor.first_name} {doctor.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Radiograph Type</InputLabel>
          <Select
            value={radiographType}
            onChange={(e) => setRadiographType(e.target.value)}
          >
            {radiographTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Imaging Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={imagingDate}
          onChange={(e) => setImagingDate(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {status === "completed" && (
          <TextField
            margin="dense"
            label="Result"
            fullWidth
            multiline
            rows={4}
            value={result}
            onChange={(e) => setResult(e.target.value)}
            variant="outlined"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Radiograph
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRadiographDialog;
