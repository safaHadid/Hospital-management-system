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
import TestDetailsDialog from "./TestDetailsDialog";
import EditTestDialog from "./EditTestDialog";

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

export default function LabTestsTable({ mockTests, doctors, testNames }) {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTests(mockTests);
      setLoading(false);
    }, 1000);
  }, [mockTests]);

  const handleDetails = (test) => {
    setSelectedTest(test);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (test) => {
    setSelectedTest(test);
    setOpenEditDialog(true);
    console.log(test);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedTest(null);
  };
  

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedTest(null);
  };

  const handleDelete = (id) => {
    console.log(`Delete test ID: ${id}`);
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
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell align="right">Test Name</StyledTableCell>
              <StyledTableCell align="right">Doctor Name</StyledTableCell>
              <StyledTableCell align="right">Result Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => (
              <StyledTableRow key={test.id}>
                <StyledTableCell>{test.patient_name}</StyledTableCell>
                <StyledTableCell align="right">
                  {test.test_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {test.doctor_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {test.result_date}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span
                    style={{
                      color:
                        test.status === "Completed"
                          ? "green"
                          :"blue"
                    }}
                  >
                    {test.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(test)}>
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Test">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(test)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Test">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(test.id)}
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

      {selectedTest ? (
              <TestDetailsDialog
                open={openDetailsDialog}
                handleClose={handleCloseDetails}
                test={selectedTest}
              />
            ) : null}
      
            {selectedTest ? (
              <EditTestDialog
                open={openEditDialog}
                handleClose={handleCloseEdit}
                test={selectedTest}
                doctors={doctors}
                testNames={testNames}
              />
            ) : null}
    </>
  );
}
