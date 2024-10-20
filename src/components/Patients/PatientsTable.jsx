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
  },
  {
    id: 6,
    first_name: "James",
    last_name: "Wilson",
    phone: "555-3210",
    address: "135 Cedar Ln, Springfield",
    date_of_birth: "1988-03-18",
    gender: "Male",
    department: "Dermatology",
    room: 601,
  },
  {
    id: 7,
    first_name: "Sophia",
    last_name: "Miller",
    phone: "555-2468",
    address: "789 Elm St, Springfield",
    date_of_birth: "1984-09-26",
    gender: "Female",
    department: "Radiology",
    room: 701,
  },
  {
    id: 8,
    first_name: "Liam",
    last_name: "Martinez",
    phone: "555-1357",
    address: "135 Spruce St, Springfield",
    date_of_birth: "1992-11-15",
    gender: "Male",
    department: "Gastroenterology",
    room: 802,
  },
  {
    id: 9,
    first_name: "Charlotte",
    last_name: "Garcia",
    phone: "555-3698",
    address: "789 Poplar Dr, Springfield",
    date_of_birth: "1986-04-25",
    gender: "Female",
    department: "Emergency Medicine",
    room: 901,
  },
  {
    id: 10,
    first_name: "Benjamin",
    last_name: "Clark",
    phone: "555-9753",
    address: "456 Pine Rd, Springfield",
    date_of_birth: "1991-01-12",
    gender: "Male",
    department: "Endocrinology",
    room: 1003,
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
              <StyledTableCell>Department</StyledTableCell>
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
                <StyledTableCell>{patient.department}</StyledTableCell>
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
