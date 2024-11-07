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
import AssignmentIcon from '@mui/icons-material/Assignment';
import PatientDetailsDialog from "./PatientDetailsDialog";
import EditPatientDialog from "./EditPatientDialog";
import { Pagination } from "@mui/material";
import axios from "axios";

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


const PatientsTable = ({departments}) => {
  const [patients, setPatients] = useState([]);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchPatients(page);
  }, [page,patients]);

  const fetchPatients = (page) => {
    axios.get(`https://endtest.takeittechnology.tech/api/patients?page=${page}`)
    .then((response) => {
      setPatients(response.data.data);
      setLastPage(response.data.pagination.total_pages);
    })
        .catch((error) => console.error("Error fetching departments:", error));
        
};
  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setOpenEditDialog(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };  

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `https://endtest.takeittechnology.tech/api/patients/${id}`
      );
      setPatients((prev) =>
        prev.filter((patient) => patient.id !== id)
      );
      console.log(`Deleted ID: ${id}`);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };


  const handleSave = (updatedDoctor) => {
    console.log("updatedDoctor :" , updatedDoctor );
  };


  const handleDetails = (patient) => {
    setSelectedPatient(patient);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedPatient(null);
  };
  

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedPatient(null);
  };


  return (
    <>
    <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Room</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <StyledTableRow key={patient.id}>
                <StyledTableCell>{patient.first_name} {patient.last_name}</StyledTableCell>
                <StyledTableCell>{patient.date_of_birth.substring(0, 10)}</StyledTableCell>
                <StyledTableCell>{patient.gender}</StyledTableCell>
                <StyledTableCell>{patient.room}</StyledTableCell>
                <StyledTableCell>
                <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(patient)}>
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Patient">
                    <IconButton color="primary" onClick={() => handleEdit(patient)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Patient">
                    <IconButton color="error" onClick={() => handleDelete(patient.id)}>
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


    {selectedPatient?
    <PatientDetailsDialog
      open={openDetailsDialog}
      handleClose={handleCloseDetails}
      patient={selectedPatient}
    />
    : null}

    {selectedPatient?
      <EditPatientDialog
      open={openEditDialog}
      handleClose={handleCloseEdit}
      patient={selectedPatient}
      departments={departments}
    /> : null}

    
    </>

    
  );
};

export default PatientsTable;
