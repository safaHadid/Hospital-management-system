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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDepartmentDialog from "./EditDepartmentDialog"; 
import DepartmentDetailsDialog from './DepartmentDetailsDialog'; // Import both dialogs

const mockDepartments = [
  { id: 1, name: "Cardiology", number_of_rooms: 10, head_doctor: "Dr. Smith", doctors: ["Dr. Smith", "Dr. A", "Dr. B"], nurses: ["Nurse 1", "Nurse 2"] },
  { id: 2, name: "Neurology", number_of_rooms: 8, head_doctor: "Dr. Johnson", doctors: ["Dr. Johnson", "Dr. C", "Dr. D"], nurses: ["Nurse 3", "Nurse 4"] },
  { id: 3, name: "Pediatrics", number_of_rooms: 12, head_doctor: "Dr. Williams", doctors: ["Dr. Williams", "Dr. E", "Dr. F"], nurses: ["Nurse 5", "Nurse 6"] },
  { id: 4, name: "Oncology", number_of_rooms: 5, head_doctor: "Dr. Brown", doctors: ["Dr. Brown", "Dr. G", "Dr. H"], nurses: ["Nurse 7", "Nurse 8"] },
  { id: 5, name: "Orthopedics", number_of_rooms: 7, head_doctor: "Dr. Taylor", doctors: ["Dr. Taylor", "Dr. I", "Dr. J"], nurses: ["Nurse 9", "Nurse 10"] },
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

export default function DepartmentsTable() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDepartments(mockDepartments);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDetails = (department) => {
    setSelectedDepartment(department);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
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
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Department Name</StyledTableCell>
              <StyledTableCell align="right">Total Rooms</StyledTableCell>
              <StyledTableCell align="right">Head of Department</StyledTableCell>
              <StyledTableCell align="right">Number of Doctors</StyledTableCell>
              <StyledTableCell align="right">Number of Nurses</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <StyledTableRow key={department.id}>
                <StyledTableCell>{department.name}</StyledTableCell>
                <StyledTableCell align="right">{department.number_of_rooms}</StyledTableCell>
                <StyledTableCell align="right">{department.head_doctor}</StyledTableCell>
                <StyledTableCell align="right">{department.doctors.length}</StyledTableCell>
                <StyledTableCell align="right">{department.nurses.length}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(department)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Department">
                    <IconButton color="primary" onClick={() => handleEdit(department)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Department">
                    <IconButton color="error" onClick={() => handleDelete(department.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedDepartment && (
        <>
          <EditDepartmentDialog
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            department={selectedDepartment}
            handleSave={handleSave}
          />
          <DepartmentDetailsDialog
            open={openDetailsDialog}
            handleClose={() => setOpenDetailsDialog(false)}
            department={selectedDepartment}
          />
        </>
      )}
    </>
  );
}
