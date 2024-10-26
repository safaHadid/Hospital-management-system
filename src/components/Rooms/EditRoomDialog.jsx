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
import { useDispatch, useSelector } from "react-redux";
import { editRoom } from "../../redux/roomsSlice";

const EditRoomDialog = ({ open, handleClose, room, handleSave }) => {
  const [roomNumber, setRoomNumber] = useState(room.room_number);
  const [roomType, setRoomType] = useState(room.room_type);
  const [roomStatus, setRoomStatus] = useState(room.status);
  const [departmentName, setDepartmentName] = useState(room.department_name);

  const dispatch = useDispatch();

  const departments = useSelector((state) => state.room.departments);

  const handleSaveClick = () => {
    const updatedRoom = {
      ...room,
      room_number: roomNumber,
      room_type: roomType,
      status: roomStatus,
      department_name: departmentName,
    };

    dispatch(editRoom(updatedRoom));
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

        <FormControl fullWidth margin="dense">
          <InputLabel>Department</InputLabel>
          <Select
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          >
            {departments.map((department, index) => (
              <MenuItem key={index} value={department.name}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default EditRoomDialog;
