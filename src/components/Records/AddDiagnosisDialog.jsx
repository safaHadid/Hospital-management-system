import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from '@mui/material';

const AddDiagnosisDialog = ({ open, handleClose }) => {
  const [newEntry, setNewEntry] = useState({
    diagnosis: '',
    prescription: '',
    treatment_plan: '',
    notes: '',
  });

  const handleSubmit = (newEntry) => {
    console.log(newEntry);
    
    setNewEntry({
      diagnosis: '',
      prescription: '',
      treatment_plan: '',
      notes: '',
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: 'primary.main',color:"white"}}>Add New Diagnosis</DialogTitle>
      <DialogContent>
        <TextField
          label="Diagnosis"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={newEntry.diagnosis}
          onChange={(e) => setNewEntry({ ...newEntry, diagnosis: e.target.value })}
          sx={{ marginBottom: '10px' , mt:3 }}
        />
        <TextField
          label="Prescription"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={newEntry.prescription}
          onChange={(e) => setNewEntry({ ...newEntry, prescription: e.target.value })}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Treatment Plan"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={newEntry.treatment_plan}
          onChange={(e) => setNewEntry({ ...newEntry, treatment_plan: e.target.value })}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Notes"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={newEntry.notes}
          onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
          sx={{ marginBottom: '10px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>{handleSubmit(newEntry)}} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDiagnosisDialog;
