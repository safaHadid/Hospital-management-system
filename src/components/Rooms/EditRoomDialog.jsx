import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const EditRoomDialog = ({ open, handleClose, room, departments, handleSave }) => {
  const [roomNumber, setRoomNumber] = useState(room.room_number);
  const [roomType, setRoomType] = useState(room.room_type);
  const [roomStatus, setRoomStatus] = useState(room.status);
  const [bedsNumber, setBedsNumber] = useState(room.number_of_beds);
  const [departmentName, setDepartmentName] = useState(room.department_name);

  const handleSaveClick = () => {
    console.log("Room Number:", roomNumber);
    console.log("Room Type:", roomType);
    console.log("Room Status:", roomStatus);
    console.log("Number of Beds:", bedsNumber);
    console.log("Department Name:", departmentName);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Room Number"
          fullWidth
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Room Type</InputLabel>
          <Select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="ICU">ICU</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Room Status</InputLabel>
          <Select
            value={roomStatus}
            onChange={(e) => setRoomStatus(e.target.value)}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Occupied">Occupied</MenuItem>
            <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          type='number'
          label="Number of Beds"
          fullWidth
          value={bedsNumber}
          onChange={(e) => setBedsNumber(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Department</InputLabel>
          <Select defaultValue={departmentName}>
            {departments.map((department, index) => (
              <MenuItem key={index} value={department.name} onChange={(e)=>{setDepartmentName(e.target.value)}}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoomDialog;
