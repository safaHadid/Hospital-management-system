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


export default function SurgeriesTable({ mockSurgeries,doctors,surgeryTypes }) {
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurgery, setSelectedSurgery] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSurgeries(mockSurgeries);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDetails = (surgery) => {
    setSelectedSurgery(surgery);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (surgery) => {
    setSelectedSurgery(surgery);
    setOpenEditDialog(true);
    console.log(surgery);
    
  };

  const handleDelete = (id) => {
    console.log(`Delete surgery ID: ${id}`);
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
                  {surgery.roomNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {surgery.surgery_type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {surgery.surgery_date}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {surgery.doctor_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span
                    style={{
                      color:
                        surgery.surgery_status === "Completed"
                          ? "green"
                          : surgery.surgery_status === "Scheduled"
                          ? "blue"
                          : surgery.surgery_status === "Canceled"
                          ? "red"
                          : "black",
                    }}
                  >
                    {surgery.surgery_status}
                  </span>
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
          doctors={doctors}
          surgeryTypes={surgeryTypes}
        />
      ) : null}
    </>
  );
}
