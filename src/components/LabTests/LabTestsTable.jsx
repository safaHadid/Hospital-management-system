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

export default function LabTestsTable({testNames }) {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchTests(page);
  }, [page,tests]);

  const fetchTests = (page) => {
    axios
      .get(`https://endtest.takeittechnology.tech/api/laboratories?page=${page}`)
      .then((response) => {
        setTests(response.data.data);
        console.log(response.data.data);
        
        setLastPage(response.data.meta.last_page);
      })
      .catch((error) => console.error("Error fetching:", error));
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  
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

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `https://endtest.takeittechnology.tech/api/laboratories/${id}`
      );
      setTests((prev) =>
        prev.filter((test) => test.id !== id)
      );
      console.log(`Deleted ID: ${id}`);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

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
                <StyledTableCell>{test.patient}</StyledTableCell>
                <StyledTableCell align="right">
                  {test.test_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {test.doctor}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {test.test_date}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {test.status}
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
      <Pagination
        count={lastPage}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />

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
                testNames={testNames}
              />
            ) : null}
    </>
  );
}
