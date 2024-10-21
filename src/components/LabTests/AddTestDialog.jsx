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

const AddTestDialog = ({
  open,
  handleClose,
  doctors,
  testNames,
}) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Lab Test</DialogTitle>
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
