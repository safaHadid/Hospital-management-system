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

const EditTestDialog = ({ open, handleClose, test, testNames }) => {
  const [patientName, setPatientName] = useState(test.patient || "");
  const [doctorName, setDoctorName] = useState(test.doctor || "");
  const [patientID, setPatientID] = useState(test.patient_id);
  const [doctorID, setDoctorId] = useState(test.doctor_id);
  const [testName, setTestName] = useState(test.test_name);
  const [testDate, setTestDate] = useState(test.test_date);
  const [status, setStatus] = useState(test.status);
  const [result, setResult] = useState(test.results);
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
    const updatedTest = {
      patient_id: patientID,
      doctor_id: doctorID,
      test_name : testName,
      test_date : testDate,
      status : status,
      results : result
    };
    try {
      await axios.put(
        `https://endtest.takeittechnology.tech/api/laboratories/${test.id}`,
        updatedTest,
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
      <DialogTitle>Edit Lab Test</DialogTitle>
      <DialogContent>
      <FormControl fullWidth margin="dense">
          <InputLabel>Patient Name</InputLabel>
          <Select
            value={patientName}
            onChange={(e)=>{setPatientName(e.target.value)}}
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={`${patient.first_name} ${patient.last_name}`} onClick={()=>{setPatientID(patient.id);
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
          <InputLabel>Test Name</InputLabel>
          <Select
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          >
            {testNames.map((test, index) => (
              <MenuItem key={index} value={test}>
                {test}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Surgery Date"
          type="date"
          fullWidth
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
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

export default EditTestDialog;
