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

const EditRadiographDialog = ({
  open,
  handleClose,
  radiograph,
  radiographTypes,
}) => {
  const [patientName, setPatientName] = useState(radiograph.patient);
  const [doctorName, setDoctorName] = useState(radiograph.doctor);
  const [patientID, setPatientID] = useState(radiograph.patient_id);
  const [doctorID, setDoctorID] = useState(radiograph.doctor_id);
  const [radiographName, setRadiographName] = useState(
    radiograph.radiology_type
  );
  const [resultDate, setResultDate] = useState(radiograph.imaging_date);
  const [status, setStatus] = useState(radiograph.status);
  const [result, setResult] = useState(radiograph.results);
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

  const handleSaveClick = async () => {
    const updateRay = {
      patient_id : patientID,
      doctor_id : doctorID,
      radiology_type : radiographName,
      imaging_date : resultDate,
      status : status,
      result : result
    }
    console.log(updateRay);
    try {
      await axios.post(
        "https://endtest.takeittechnology.tech/api/rays",
        updateRay,
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
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Radiograph Record</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Patient Name</InputLabel>
          <Select
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          >
            {patients.map((patient, index) => (
              <MenuItem
                key={index}
                value={`${patient.first_name} ${patient.last_name}`}
                onClick={() => {
                  setPatientID(patient.id);
                }}
              >
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
              <MenuItem
                key={index}
                value={`${doctor.first_name} ${doctor.last_name}`}
                onClick={() => {
                  setDoctorID(doctor.id);
                }}
              >
                {doctor.first_name} {doctor.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Radiograph Type</InputLabel>
          <Select
            value={radiographName}
            onChange={(e) => setRadiographName(e.target.value)}
          >
            {radiographTypes?.map((type, index) => (
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
          value={resultDate}
          onChange={(e) => setResultDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRadiographDialog;
