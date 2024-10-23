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
import RoomDetailsDialog from "./RoomDetailsDialog";
import EditRoomDialog from "./EditRoomDialog";

const mockRooms = [
  {
    id: 1,
    room_number: 101,
    room_type: "ICU",
    department_name: "Cardiology",
    status: "Available",
  },
  {
    id: 2,
    room_number: 102,
    room_type: "Shared",
    department_name: "Neurology",
    status: "Occupied",
  },
  {
    id: 3,
    room_number: 103,
    room_type: "ICU",
    department_name: "Pediatrics",
    status: "Available",
  },
  {
    id: 4,
    room_number: 104,
    room_type: "Shared",
    department_name: "Oncology",
    status: "Under Maintenance",
  },
  {
    id: 5,
    room_number: 105,
    room_type: "Private",
    department_name: "Orthopedics",
    status: "Occupied",
  },
];

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

export default function RoomsTable({ departments }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRooms(mockRooms);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDetails = (department) => {
    setSelectedRoom(department);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (department) => {
    setSelectedRoom(department);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    console.log(`Delete department ID: ${id}`);
  };

  const handleSave = (updatedDepartment) => {
    setOpenEditDialog(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: "100%", overflowX: "auto" }}
      >
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
                <StyledTableCell align="right">
                  {room.room_number}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {room.room_type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {room.department_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span
                    style={{
                      color:
                        room.status === "Available"
                          ? "green"
                          : room.status === "Occupied"
                          ? "blue"
                          : room.status === "Under Maintenance"
                          ? "orange"
                          : "black",
                    }}
                  >
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
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(room)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Room">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(room.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRoom && (
        <>
          <EditRoomDialog
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            room={selectedRoom}
            departments={departments}
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
