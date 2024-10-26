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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoctorDetailsDialog from "./DoctorDetailsDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoctor } from "../../redux/doctorsSlice";


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

export default function DoctorsTable() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const dispatch = useDispatch();

  const doctors = useSelector((state)=>state.doctor.doctors);
  const departments = useSelector((state)=>state.doctor.departments);


  const handleSave = (updatedDoctor) => {
    console.log("updated doctor :", updatedDoctor);
  };

  const handleDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id))
    console.log(`Delete Doctor ID: ${id}`);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedDoctor(null);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedDoctor(null);
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Specialization</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Shift</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  {doctor.first_name} {doctor.last_name}
                </StyledTableCell>
                <StyledTableCell>{doctor.specialization}</StyledTableCell>
                <StyledTableCell>{doctor.department_name}</StyledTableCell>
                <StyledTableCell>{doctor.shift}</StyledTableCell>
                <StyledTableCell>{doctor.phone}</StyledTableCell>
                <StyledTableCell>{doctor.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(doctor)}>
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Doctor">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(doctor)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Department">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(doctor.id)}
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

      {selectedDoctor ?
        <DoctorDetailsDialog
        open={openDetailsDialog}
        handleClose={handleCloseDetails}
        doctor={selectedDoctor}
      /> : null}

      {selectedDoctor ?
        <EditDoctorDialog
          open={openEditDialog}
          handleClose={handleCloseEdit}
          doctor={selectedDoctor}
          handleSave={handleSave}
        />
      : null}
    </>
  );
}
