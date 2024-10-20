import React, { useState } from "react";
import { Button } from "@mui/material";
import AddPatientDialog from "../components/Patients/AddPatientDialog";
import PatientsTable from "../components/Patients/PatientsTable";

const Patients = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const departments = [
    {
      id: 1,
      name: "Cardiology",
      rooms: [
        { roomNumber: 101, type: "ICU", status: "Occupied", bedsNumber: 1 },
        {
          roomNumber: 102,
          type: "Private",
          status: "Available",
          bedsNumber: 2,
        },
        { roomNumber: 103, type: "Shared", status: "Occupied", bedsNumber: 3 },
      ],
    },
    {
      id: 2,
      name: "Neurology",
      rooms: [
        {
          roomNumber: 201,
          type: "Private",
          status: "Available",
          bedsNumber: 2,
        },
        { roomNumber: 202, type: "ICU", status: "Occupied", bedsNumber: 1 },
        { roomNumber: 203, type: "Shared", status: "Available", bedsNumber: 4 },
      ],
    },
    {
      id: 3,
      name: "Oncology",
      rooms: [
        {
          roomNumber: 301,
          type: "Shared",
          status: "Under Maintenance",
          bedsNumber: 3,
        },
        { roomNumber: 302, type: "Private", status: "Occupied", bedsNumber: 2 },
        { roomNumber: 303, type: "ICU", status: "Available", bedsNumber: 1 },
      ],
    },
    {
      id: 4,
      name: "Pediatrics",
      rooms: [
        {
          roomNumber: 401,
          type: "Private",
          status: "Available",
          bedsNumber: 1,
        },
        { roomNumber: 402, type: "Shared", status: "Occupied", bedsNumber: 3 },
        {
          roomNumber: 403,
          type: "Private",
          status: "Under Maintenance",
          bedsNumber: 2,
        },
      ],
    },
    {
      id: 5,
      name: "Orthopedics",
      rooms: [
        { roomNumber: 501, type: "Shared", status: "Available", bedsNumber: 4 },
        { roomNumber: 502, type: "Private", status: "Occupied", bedsNumber: 1 },
        { roomNumber: 503, type: "ICU", status: "Available", bedsNumber: 1 },
      ],
    },
    {
      id: 6,
      name: "Dermatology",
      rooms: [
        { roomNumber: 601, type: "Private", status: "Occupied", bedsNumber: 1 },
        { roomNumber: 602, type: "Shared", status: "Available", bedsNumber: 3 },
        { roomNumber: 603, type: "ICU", status: "Occupied", bedsNumber: 1 },
      ],
    },
    {
      id: 7,
      name: "Radiology",
      rooms: [
        {
          roomNumber: 701,
          type: "Private",
          status: "Available",
          bedsNumber: 1,
        },
        { roomNumber: 702, type: "Shared", status: "Occupied", bedsNumber: 2 },
        { roomNumber: 703, type: "ICU", status: "Available", bedsNumber: 1 },
      ],
    },
    {
      id: 8,
      name: "Gastroenterology",
      rooms: [
        { roomNumber: 801, type: "Shared", status: "Available", bedsNumber: 4 },
        { roomNumber: 802, type: "Private", status: "Occupied", bedsNumber: 1 },
        {
          roomNumber: 803,
          type: "ICU",
          status: "Under Maintenance",
          bedsNumber: 1,
        },
      ],
    },
    {
      id: 9,
      name: "Emergency Medicine",
      rooms: [
        { roomNumber: 901, type: "ICU", status: "Occupied", bedsNumber: 1 },
        {
          roomNumber: 902,
          type: "Private",
          status: "Available",
          bedsNumber: 2,
        },
        { roomNumber: 903, type: "Shared", status: "Occupied", bedsNumber: 3 },
      ],
    },
    {
      id: 10,
      name: "Endocrinology",
      rooms: [
        {
          roomNumber: 1001,
          type: "Private",
          status: "Available",
          bedsNumber: 1,
        },
        { roomNumber: 1002, type: "ICU", status: "Occupied", bedsNumber: 1 },
        {
          roomNumber: 1003,
          type: "Shared",
          status: "Available",
          bedsNumber: 3,
        },
      ],
    },
  ];

  const doctorsList = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Williams",
    "Dr. Brown",
    "Dr. Taylor",
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
        Add Patient
      </Button>

      <PatientsTable departments={departments} />

      <AddPatientDialog
        open={openDialog}
        handleClose={handleClose}
        doctors={doctorsList}
        departments={departments}
      />
    </div>
  );
};

export default Patients;
