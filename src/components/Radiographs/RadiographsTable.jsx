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
import axios from "axios";
import { Pagination } from "@mui/material";

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
  radiographTypes,
}) {
  const [radiographs, setRadiographs] = useState([]);
  const [selectedRadiograph, setSelectedRadiograph] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchRays(page);
  }, [page,radiographs]);

  const fetchRays = (page) => {
    axios
      .get(`https://endtest.takeittechnology.tech/api/rays?page=${page}`)
      .then((response) => {
        setRadiographs(response.data.data);
        console.log(response.data.data);
        
        setLastPage(response.data.meta.last_page);
      })
      .catch((error) => console.error("Error fetching:", error));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };


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

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `https://endtest.takeittechnology.tech/api/rays/${id}`
      );
      setRadiographs((prev) =>
        prev.filter((ray) => ray.id !== id)
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
                <StyledTableCell>{radiograph.patient}</StyledTableCell>
                <StyledTableCell align="right">
                  {radiograph.radiology_type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {radiograph.doctor}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {radiograph.imaging_date}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {radiograph.status}
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

      <Pagination
        count={lastPage}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />

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
          radiographTypes={radiographTypes}
        />
      ) : null}
    </>
  );
}
