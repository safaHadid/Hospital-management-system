import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import PatientDetails from "../components/Records/PatientDetails";

const PatientsRecords = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const medicalRecords = [
    {
      id: 1,
      patient_name: "John Doe",
      id_card_number: "ID901244",
      diagnosisEntries: [
        {
          diagnosis: "Hypertension",
          date: "2024-10-20",
          prescription: "Amlodipine 5mg",
          treatment_plan: "Monitor blood pressure daily, regular exercise",
          notes: "Patient to follow up in 2 weeks Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quasi sit quis ea ad necessitatibus consectetur labore velit id quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quasi sit quis ea ad necessitatibus consectetur labore velit id quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quasi sit quis ea ad necessitatibus consectetur labore velit id quod.",
        },
        {
          diagnosis: "Hypertension",
          date: "2023-10-20",
          prescription: "Amlodipine 5mg",
          treatment_plan: "Monitor blood pressure daily, regular exercise",
          notes: "Patient to follow up in 2 weeks Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quasi sit quis ea ad necessitatibus consectetur labore velit id quod.",
        },
      ],
    },
    {
      id: 2,
      patient_name: "Jane Smith",
      id_card_number: "ID901234",
      diagnosisEntries: [
        {
          diagnosis: "Type 2 Diabetes",
          date: "2024-10-20",
          prescription: "Metformin 500mg",
          treatment_plan: "Low-carb diet, monitor blood sugar",
          notes: "Patient to schedule regular blood sugar checks",
        },
      ],
    },
  ];

  const handleSearch = () => {
    const result = medicalRecords.find(
      (patient) => patient.id_card_number === search);
    if (result) {
      setSearchResults(result);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Patients Records
      </Typography>
      <Paper elevation={3} sx={{ p:2, mb:3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb:3,
          }}
        >
          <TextField
            label="ID Card Number"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mr: 1, mt: 2, flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ p: 2, mt: 2 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        {searchResults && <PatientDetails searchResults={searchResults} />}
      </Paper>
    </Box>
  );
};

export default PatientsRecords;
