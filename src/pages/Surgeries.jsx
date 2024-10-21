import React, { useState } from 'react';
import { Button } from '@mui/material';
import SurgeriesTable from '../components/Surgeries/SurgeriesTable';
import AddSurgeryDialog from '../components/Surgeries/AddSurgeryDialog';

const mockSurgeries = [
  {
    id: 1,
    patient_name: "John Doe",
    roomNumber: 101,
    surgery_type: "Appendectomy",
    surgery_date: "2024-10-25",
    doctor_name: "Dr. Smith",
    surgery_status: "Scheduled",
  },
  {
    id: 2,
    patient_name: "Jane Smith",
    roomNumber: 202,
    surgery_type: "Knee Replacement",
    surgery_date: "2024-10-26",
    doctor_name: "Dr. Johnson",
    surgery_status: "Completed",
  },
  {
    id: 3,
    patient_name: "Emily Davis",
    roomNumber: 303,
    surgery_type: "Heart Bypass",
    surgery_date: "2024-10-28",
    doctor_name: "Dr. Williams",
    surgery_status: "Scheduled",
  },
  {
    id: 4,
    patient_name: "Michael Brown",
    roomNumber: 404,
    surgery_type: "Cataract Surgery",
    surgery_date: "2024-10-27",
    doctor_name: "Dr. Clark",
    surgery_status: "Canceled",
  },
  {
    id: 5,
    patient_name: "Sarah Wilson",
    roomNumber: 505,
    surgery_type: "Gallbladder Removal",
    surgery_date: "2024-10-29",
    doctor_name: "Dr. Taylor",
    surgery_status: "Scheduled",
  },
];

const surgeryTypes = [
  "Appendectomy",
  "Cholecystectomy",
  "Hernia Repair",
  "Gallbladder Removal",
  "Hip Replacement",
  "Knee Replacement",
  "Cataract Surgery",
  "Coronary Bypass",
  "Spinal Fusion",
  "Mastectomy",
];

const doctorsList = [
  "Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Taylor"
];

const rooms = [101, 102, 103, 104];


const Surgeries = () => {
  const [openDialog, setOpenDialog] = useState(false);



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
        sx={{ backgroundColor: 'primary.main', color: 'white', my: 5, px: 5, py: 2 }}
        onClick={handleClickOpen}
      >
        Add Surgery
      </Button>

      <SurgeriesTable mockSurgeries={mockSurgeries} doctors={doctorsList} surgeryTypes={surgeryTypes} />

      <AddSurgeryDialog
        open={openDialog} 
        handleClose={handleClose} 
        surgeries={mockSurgeries} 
        rooms={rooms}
        doctors={doctorsList}
        surgeryTypes={surgeryTypes}
      />
    </div>
  );
};

export default Surgeries;
