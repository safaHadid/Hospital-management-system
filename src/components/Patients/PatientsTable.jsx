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

const mockPatients = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    phone: "555-1234",
    address: "123 Main St, Springfield",
    date_of_birth: "1985-02-15",
    gender: "Male",
    department: "Cardiology",
    room: 101,
    id_card_number: "ID123456",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    phone: "555-5678",
    address: "456 Oak Ave, Springfield",
    date_of_birth: "1990-07-22",
    gender: "Female",
    department: "Neurology",
    room: 201,
    id_card_number: "ID789012",
  },
  {
    id: 3,
    first_name: "Emily",
    last_name: "Johnson",
    phone: "555-9876",
    address: "789 Pine Dr, Springfield",
    date_of_birth: "1978-10-03",
    gender: "Female",
    department: "Oncology",
    room: 302,
    id_card_number: "ID345678",
  },
  {
    id: 4,
    first_name: "Michael",
    last_name: "Brown",
    phone: "555-6543",
    address: "321 Maple St, Springfield",
    date_of_birth: "1982-05-30",
    gender: "Male",
    department: "Pediatrics",
    room: 401,
    id_card_number: "ID901234",
  },
  {
    id: 5,
    first_name: "Olivia",
    last_name: "Davis",
    phone: "555-7890",
    address: "246 Birch Rd, Springfield",
    date_of_birth: "1995-12-10",
    gender: "Female",
    department: "Orthopedics",
    room: 502,
    id_card_number: "ID567890",
  },
];


const PatientsTable = ({departments}) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setOpenEditDialog(true);
  };
  

  const handleDelete = (id) => {
    console.log(`Deleting patient ID: ${id}`);
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

  if (loading) {
    return <div>Loading...</div>;
  }


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
                <StyledTableCell>{patient.date_of_birth}</StyledTableCell>
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
