import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import RoomDetailsDialog from "./RoomDetailsDialog";
import EditRoomDialog from "./EditRoomDialog";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function RoomsTable() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [page, setPage] = useState(1); 
  const [lastPage, setLastPage] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchRooms(page, status);
  }, [page, status,rooms]);

  const fetchRooms = (page, status) => {
    let url = `https://endtest.takeittechnology.tech/api/rooms?page=${page}`;
    if (status) url = `https://endtest.takeittechnology.tech/api/rooms/filter-rooms?status=${status}`;

    axios.get(url)
      .then((response) => {
        setRooms(response.data.data);
        console.log(response.data.data);
        
        setLastPage(response.data.meta.last_page); 
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleDetails = (room) => {
    setSelectedRoom(room);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setOpenEditDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://endtest.takeittechnology.tech/api/rooms/${id}`);
      setRooms((prev) => prev.filter((room) => room.id !== id));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleSave = () => {
    setOpenEditDialog(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel>Filter By Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} label="Status">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="occupied">Occupied</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell align="right">Room Type</StyledTableCell>
              <StyledTableCell align="right">Department Name</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <StyledTableRow key={room.id}>
                <StyledTableCell align="right">{room.room_number}</StyledTableCell>
                <StyledTableCell align="right">{room.type}</StyledTableCell>
                <StyledTableCell align="right">{room.department_name}</StyledTableCell>
                <StyledTableCell align="right">
                  <span style={{ color: room.status === "Available" ? "green" : "blue" }}>
                    {room.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(room)}>
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Room">
                    <IconButton color="primary" onClick={() => handleEdit(room)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Room">
                    <IconButton color="error" onClick={() => handleDelete(room.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!status && 
      <Pagination
      count={lastPage} 
      page={page} 
      onChange={handlePageChange} 
      color="primary"
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    />}

      {selectedRoom && (
        <>
          <EditRoomDialog
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            room={selectedRoom}
            handleSave={handleSave}
          />
          <RoomDetailsDialog
            open={openDetailsDialog}
            handleClose={() => setOpenDetailsDialog(false)}
            room={selectedRoom}
          />
        </>
      )}
    </>
  );
}
