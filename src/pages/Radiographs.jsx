import React, { useState } from "react";
import { Button } from "@mui/material";
import AddRadiographDialog from "../components/Radiographs/AddRadiographDialog";
import RadiographsTable from "../components/Radiographs/RadiographsTable";

const Radiographs = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const mockRadiographs = [
    {
      id: 1,
      patient_name: "John Doe",
      doctor_name: "Dr. Smith",
      radiology_type: "Chest X-ray",
      imaging_date: "2024-10-15",
      results: "No abnormalities detected",
      status: "Completed",
    },
    {
      id: 2,
      patient_name: "Jane Roe",
      doctor_name: "Dr. Johnson",
      radiology_type: "Abdominal X-ray",
      imaging_date: "2024-10-12",
      results: "Signs of mild obstruction",
      status: "Completed",
    },
    {
      id: 3,
      patient_name: "Chris Evans",
      doctor_name: "Dr. Williams",
      radiology_type: "Skull X-ray",
      imaging_date: "2024-10-20",
      results: "-",
      status: "Pending",
    },
    {
      id: 4,
      patient_name: "Lucy Heart",
      doctor_name: "Dr. Williams",
      radiology_type: "Pelvic X-ray",
      imaging_date: "2024-10-18",
      results: "Fracture in left pelvis",
      status: "Completed",
    },
    {
      id: 5,
      patient_name: "Mark Steele",
      doctor_name: "Dr. Brown",
      radiology_type: "Spine X-ray",
      imaging_date: "2024-10-17",
      results: "Degenerative disc disease",
      status: "Completed",
    },
  ];

  const doctorsList = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Williams",
    "Dr. Brown",
    "Dr. Taylor",
  ];

  const radiographTypes = [
    "Chest X-ray",
    "Abdominal X-ray",
    "Skull X-ray",
    "Pelvic X-ray",
    "Spine X-ray",
  ];

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          my: 5,
          px: 5,
          py: 2,
        }}
        onClick={handleClickOpen}
      >
        Add Radiograph
      </Button>

      <RadiographsTable 
        mockRadiographs={mockRadiographs} 
        radiographTypes={radiographTypes} 
        doctors={doctorsList} 
      />

      <AddRadiographDialog
        open={openDialog}
        handleClose={handleClose}
        doctors={doctorsList}
        radiographTypes={radiographTypes}
      />
    </div>
  );
};

export default Radiographs;
