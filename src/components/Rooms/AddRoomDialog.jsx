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

const AddRoomDialog = ({ open, handleClose }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [departments , setDepartments] = useState([]);

  const StatusOfRoom = ["Available", "Occupied", "Under Maintenance"];
  const TypeOfRoom = ["ICU", "Private", "Shared"];


  useEffect(() => {
    axios.get('https://endtest.takeittechnology.tech/api/departments')
        .then((response) => setDepartments(response.data.data))
        .catch((error) => console.error("Error fetching departments:", error));
}, []);

  const handleSubmit = async () => {
      const newRoom = {
        room_number: roomNumber,
        type: roomType,
        status: roomStatus,
        department_id: departmentID,
      };

      try {
        await axios.post(
          "https://endtest.takeittechnology.tech/api/rooms",
          newRoom
        );
        setRoomNumber("");
          setRoomType("");
          setRoomStatus("");
          setDepartmentID("");
          handleClose();
      }
      catch (error) {
        console.error("Error adding room:", error);
        alert("An error occurred while adding the room.");
      }
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
            value={departmentID}
            onChange={(e) => setDepartmentID(e.target.value)}
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
