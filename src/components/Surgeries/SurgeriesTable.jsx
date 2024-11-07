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
import SurgeryDetailsDialog from "./SurgeryDetailsDialog";
import EditSurgeryDialog from "./EditSurgeryDialog";
import axios from "axios";
import { Pagination, TextField } from "@mui/material";

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


export default function SurgeriesTable() {
  const [surgeries, setSurgeries] = useState([]);
  const [date, setDate] = useState('');
  const [selectedSurgery, setSelectedSurgery] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchSurgeries(page);
  }, [page,date,surgeries]);

  const fetchSurgeries = (page) => {
    let url = `https://endtest.takeittechnology.tech/api/surgeries?page=${page}`
    if (date) url =`https://endtest.takeittechnology.tech/api/surgeries/filter?date_scheduled=${date}`
    axios
      .get(url)
      .then((response) => {
        setSurgeries(response.data.data);
        console.log(response.data.data);
        
        setLastPage(response.data.meta.last_page);
      })
      .catch((error) => console.error("Error fetching:", error));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  const handleDetails = (surgery) => {
    setSelectedSurgery(surgery);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (surgery) => {
    setSelectedSurgery(surgery);
    setOpenEditDialog(true);
    console.log(surgery);
    
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `https://endtest.takeittechnology.tech/api/surgeries/${id}`
      );
      setSurgeries((prev) =>
        prev.filter((surgery) => surgery.id !== id)
      );
      console.log(`Deleted ID: ${id}`);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <>
    <TextField
          margin="dense"
          label="Surgery Date"
          type="date"
          fullWidth
          sx={{mb:2}}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDate(e.target.value)}
        />
      <TableContainer
        component={Paper}
        style={{ width: "100%", overflowX: "auto" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell align="right">Room Number</StyledTableCell>
              <StyledTableCell align="right">Surgery Type</StyledTableCell>
              <StyledTableCell align="right">Surgery Date</StyledTableCell>
              <StyledTableCell align="right">Doctor Name</StyledTableCell>
              <StyledTableCell align="right">Surgery Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surgeries.map((surgery) => (
              <StyledTableRow key={surgery.id}>
                <StyledTableCell>{surgery.patient_name}</StyledTableCell>
                <StyledTableCell align="right">
                  {surgery.room_number}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {surgery.type_surgery}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {surgery.date_scheduled}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {surgery.doctor_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {surgery.status_surgery}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(surgery)}>
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Surgery">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(surgery)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Surgery">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(surgery.id)}
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
      {!date && 
      <Pagination
      count={lastPage}
      page={page}
      onChange={handlePageChange}
      color="primary"
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    />}

      {selectedSurgery ? (
        <SurgeryDetailsDialog
          open={openDetailsDialog}
          handleClose={() => setOpenDetailsDialog(false)}
          surgery={selectedSurgery}
        />
      ) : null}

      {selectedSurgery ? (
        <EditSurgeryDialog
          open={openEditDialog}
          handleClose={() => setOpenEditDialog(false)}
          surgery={selectedSurgery}
        />
      ) : null}
    </>
  );
}
