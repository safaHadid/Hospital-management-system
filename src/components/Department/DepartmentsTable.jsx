import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Pagination, Tooltip } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDepartmentDialog from "./EditDepartmentDialog";
import DepartmentDetailsDialog from "./DepartmentDetailsDialog";
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

export default function DepartmentsTable() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchDepartments(page);
  }, [page,departments]);

  const fetchDepartments = (page) => {
    axios
      .get(`https://endtest.takeittechnology.tech/api/departments?page=${page}`)
      .then((response) => {
        setDepartments(response.data.data);
        setLastPage(response.data.meta.last_page);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  };

  const handleDetails = (department) => {
    setSelectedDepartment(department);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setOpenEditDialog(true);
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `https://endtest.takeittechnology.tech/api/departments/${id}`
      );
      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department.id !== id)
      );
      console.log(`Deleted department ID: ${id}`);
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSave = (updatedDepartment) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept.id === updatedDepartment.id ? updatedDepartment : dept
      )
    );
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Department Name</StyledTableCell>
              <StyledTableCell align="right">Total Rooms</StyledTableCell>
              <StyledTableCell align="right">
                Head of Department
              </StyledTableCell>
              <StyledTableCell align="right">Number of Doctors</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <StyledTableRow key={department.id}>
                <StyledTableCell>{department.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {department.number_of_rooms}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {department.head_doctor}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {department.doctors.length}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(department)}>
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Department">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(department)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Department">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(department.id)}
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
