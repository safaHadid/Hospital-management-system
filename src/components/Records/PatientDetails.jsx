import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import AddDiagnosisDialog from "./AddDiagnosisDialog";

const PatientDetails = ({ searchResults }) => {
  const [diagnosisEntries, setDiagnosisEntries] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (searchResults && searchResults.diagnosisEntries) {
      setDiagnosisEntries(searchResults.diagnosisEntries);
    }
  }, [searchResults]);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#444", marginBottom: "10px" }}
      >
        {searchResults.patient_name}
      </Typography>
      <Typography variant="body1">
        <strong>ID Card:</strong> {searchResults.id_card_number}
      </Typography>
      <Typography variant="body1">
        <strong>Patient Name:</strong> {searchResults.patient_name}
      </Typography>

      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ p: 2, mb: 5 }}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Diagnosis
        </Button>

        <AddDiagnosisDialog
          open={isDialogOpen}
          handleClose={() => setIsDialogOpen(false)}
        />
        {diagnosisEntries.map((entry, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              borderLeft: "5px solid #1976d2",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {entry.date}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: "15px",
                mb: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    Diagnosis:
                  </Typography>{" "}
                  {entry.diagnosis}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    Prescription:
                  </Typography>{" "}
                  {entry.prescription}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    Treatment Plan:
                  </Typography>{" "}
                  {entry.treatment_plan}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    Notes:
                  </Typography>
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    padding: "10px",
                    maxHeight: "180px",
                    overflowY: "auto",
                    backgroundColor: "#fff",
                  }}
                >
                  {entry.notes}
                </Paper>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default PatientDetails;
