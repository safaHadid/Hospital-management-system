import React, { useEffect, useState } from "react";
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
import axios from "axios";

const EditRoomDialog = ({ open, handleClose, room }) => {
  const [roomNumber, setRoomNumber] = useState(room.room_number);
  const [roomType, setRoomType] = useState(room.type);
  const [roomStatus, setRoomStatus] = useState(room.status);
  const [departmentID, setDepartmentID] = useState(room.department_id);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(room.department_name);
  


  useEffect(() => {
    axios
      .get("https://endtest.takeittechnology.tech/api/departments")
      .then((response) => setDepartments(response.data.data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  useEffect(() => {
    setRoomNumber(room.room_number);
    setRoomType(room.type);
    setRoomStatus(room.status);
    setDepartmentID(room.department_id);
  }, [room]);

  const handleSaveClick = async () => {
    const updatedRoom = {
      room_number: roomNumber,
      type: roomType,
      status: roomStatus,
      department_id: departmentID,
    };

    try {
      const response = await axios.put(
        `https://endtest.takeittechnology.tech/api/rooms/${room.id}`,
        updatedRoom
      );
      handleClose();
      console.log("Room updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating room:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while updating the room. Please try again.");
    }
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
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="occupied">Occupied</MenuItem>
            <MenuItem value="under maintenance">Under Maintenance</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e)=>{setDepartment(e.target.value)}}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.name} onClick={()=>setDepartmentID(dept.id)}>
                {dept.name}
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
