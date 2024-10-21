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

const EditTestDialog = ({ open, handleClose, test, doctors, testNames }) => {
  const [patientName, setPatientName] = useState(test.patient_name);
  const [doctorName, setDoctorName] = useState(test.doctor_name);
  const [testName, setTestName] = useState(test.test_name);
  const [resultDate, setResultDate] = useState(test.result_date);
  const [status, setStatus] = useState(test.status);
  const [result, setResult] = useState(test.results);


  const handleSaveClick = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Lab Test</DialogTitle>
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
          value={resultDate}
          onChange={(e) => setResultDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {status === "Completed" && (
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
