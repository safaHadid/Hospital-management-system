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
import axios from "axios";
import { Pagination } from "@mui/material";


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
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchDoctors(page);
  }, [page,doctors]);

  const fetchDoctors = (page) => {
    axios.get(`https://endtest.takeittechnology.tech/api/doctors?page=${page}`)
    .then((response) => {
      setDoctors(response.data.data);
      setLastPage(response.data.pagination.total_pages);
    })
        .catch((error) => console.error("Error fetching departments:", error));
        
};


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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `https://endtest.takeittechnology.tech/api/doctors/${id}`
      );
      setDoctors((prev) =>
        prev.filter((doctor) => doctor.id !== id)
      );
      console.log(`Deleted ID: ${id}`);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
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
                <StyledTableCell>{doctor.department}</StyledTableCell>
                <StyledTableCell>{doctor.phone_number}</StyledTableCell>
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
      <Pagination
        count={lastPage}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />

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
