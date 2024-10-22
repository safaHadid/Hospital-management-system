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

const EditRadiographDialog = ({ open, handleClose, radiograph, doctors, radiographTypes }) => {
  const [patientName, setPatientName] = useState(radiograph.patient_name);
  const [doctorName, setDoctorName] = useState(radiograph.doctor_name);
  const [radiographName, setRadiographName] = useState(radiograph.radiology_type);
  const [resultDate, setResultDate] = useState(radiograph.imaging_date);
  const [status, setStatus] = useState(radiograph.status);
  const [result, setResult] = useState(radiograph.results);


  const handleSaveClick = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Radiograph Record</DialogTitle>
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
            {doctors?.map((doctor, index) => (
              <MenuItem key={index} value={doctor}>
                {doctor}
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

export default EditRadiographDialog;
