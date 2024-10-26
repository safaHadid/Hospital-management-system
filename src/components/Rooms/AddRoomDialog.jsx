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
import { useDispatch, useSelector } from "react-redux";
import { addRoom } from "../../redux/roomsSlice";

const AddRoomDialog = ({ open, handleClose }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const dispatch = useDispatch();

  const StatusOfRoom = ["Available", "Occupied", "Under Maintenance"];
  const TypeOfRoom = ["ICU", "Private", "Shared"];

  const departments = useSelector((state)=>state.room.departments);

  const handleSubmit = () => {
    if(roomNumber && roomType && roomStatus && departmentName){
      const newRoom = {
        id: Date.now(),
        room_number: roomNumber,
        room_type: roomType,
        status: roomStatus,
        department_name: departmentName,
      };
      dispatch(addRoom(newRoom));
      console.log(newRoom);
      setDepartmentName('');
      setRoomNumber('');
      setRoomStatus('');
      setRoomType('');
      handleClose();
    } else {
      alert('Please fill all fields.');
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Room</DialogTitle>
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
            {TypeOfRoom.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Room Status</InputLabel>
          <Select
            value={roomStatus}
            onChange={(e) => setRoomStatus(e.target.value)}
          >
            {StatusOfRoom.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Department</InputLabel>
          <Select
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          >
            {departments.map((department, index) => (
              <MenuItem key={index} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Room
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomDialog;
