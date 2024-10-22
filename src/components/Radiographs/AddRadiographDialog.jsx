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

const AddRadiographDialog = ({
  open,
  handleClose,
  doctors,
  radiographTypes,
}) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [radiographType, setRadiographType] = useState("");
  const [imagingDate, setImagingDate] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Radiograph Record</DialogTitle>
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
          Add Radiograph
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRadiographDialog;
