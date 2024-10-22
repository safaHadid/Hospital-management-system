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
import RadiographDetailsDialog from "./RadiographDetailsDialog";
import EditRadiographDialog from "./EditRadiographDialog";

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

export default function RadiographsTable({
  mockRadiographs,
  doctors,
  radiographTypes,
}) {
  const [loading, setLoading] = useState(true);
  const [radiographs, setRadiographs] = useState([]);
  const [selectedRadiograph, setSelectedRadiograph] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRadiographs(mockRadiographs);
      setLoading(false);
    }, 1000);
  }, [mockRadiographs]);

  const handleDetails = (radiograph) => {
    setSelectedRadiograph(radiograph);
    setOpenDetailsDialog(true);
  };

  const handleEdit = (radiograph) => {
    setSelectedRadiograph(radiograph);
    setOpenEditDialog(true);
    console.log(radiograph);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedRadiograph(null);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedRadiograph(null);
  };

  const handleDelete = (id) => {
    console.log(`Delete record ID: ${id}`);
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
              <StyledTableCell align="right">Radiograph Type</StyledTableCell>
              <StyledTableCell align="right">Doctor Name</StyledTableCell>
              <StyledTableCell align="right">Result Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {radiographs.map((radiograph) => (
              <StyledTableRow key={radiograph.id}>
                <StyledTableCell>{radiograph.patient_name}</StyledTableCell>
                <StyledTableCell align="right">
                  {radiograph.radiology_type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {radiograph.doctor_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {radiograph.imaging_date}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span
                    style={{
                      color:
                        radiograph.status === "Completed"
                          ? "green"
                          : radiograph.status === "Pending"
                          ? "blue"
                          : "black",
                    }}
                  >
                    {radiograph.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleDetails(radiograph)}>
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit radiograph">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(radiograph)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete radiograph">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(radiograph.id)}
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

      {selectedRadiograph ? (
        <RadiographDetailsDialog
          open={openDetailsDialog}
          handleClose={handleCloseDetails}
          radiograph={selectedRadiograph}
        />
      ) : null}

      {selectedRadiograph ? (
        <EditRadiographDialog
          open={openEditDialog}
          handleClose={handleCloseEdit}
          radiograph={selectedRadiograph}
          doctors={doctors}
          radiographTypes={radiographTypes}
        />
      ) : null}
    </>
  );
}
