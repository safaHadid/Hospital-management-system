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

const AddTestDialog = ({
  open,
  handleClose,
  testNames,
}) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState("");
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
    const newTest = {
      patient_id : patientName,
      doctor_id : doctorName,
      test_name : testName,
      test_date : testDate,
      status : status,
      result : result
    }
    console.log(newTest);
    try {
      await axios.post(
        "https://endtest.takeittechnology.tech/api/laboratories",
        newTest,
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
      <DialogTitle>Add New Lab Test</DialogTitle>
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
          label="Test Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
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
          Add Lab Test
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTestDialog;
