import React, { useState } from 'react';
import { Button } from '@mui/material';
import LabTestsTable from '../components/LabTests/LabTestsTable';
import AddTestDialog from '../components/LabTests/AddTestDialog';

const LabTests = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const mockTests = [
    {
      id: 1,
      test_name: "Complete Blood Count",
      patient_name: "John Doe",
      doctor_name: "Dr. Smith",
      result_date: "2024-10-15",
      results: "Normal",
      status: "Completed"
    },
    {
      id: 2,
      test_name: "Liver Function Test",
      patient_name: "Jane Roe",
      doctor_name: "Dr. Brown",
      result_date: "2024-10-18",
      results: "-",
      status: "Pending"
    },
    {
      id: 3,
      test_name: "Urine Analysis",
      patient_name: "Mark Spencer",
      doctor_name: "Dr. Williams",
      result_date: "2024-10-19",
      results: "High protein levels",
      status: "Completed"
    },
    {
      id: 4,
      test_name: "COVID-19 PCR",
      patient_name: "Sophia Turner",
      doctor_name: "Dr. Taylor",
      result_date: "2024-10-21",
      results: "Negative",
      status: "Completed"
    },
    {
      id: 5,
      test_name: "Thyroid Function Test",
      patient_name: "Alex Johnson",
      doctor_name: "Dr. Johnson",
      result_date: "2024-10-22",
      results: "-",
      status: "Pending"
    },
    {
      id: 6,
      test_name: "Blood Glucose Test",
      patient_name: "Chris Evans",
      doctor_name: "Dr. Brown",
      result_date: "2024-10-23",
      results: "Elevated glucose levels",
      status: "Completed"
    }
  ];
  
  const doctorsList = [
    "Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Taylor"
  ];

  const testNames = [
    "Complete Blood Count",
    "Liver Function Test",
    "Urine Analysis",
    "COVID-19 PCR",
    "Thyroid Function Test",
    "Blood Glucose Test"
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
        sx={{ backgroundColor: 'primary.main', color: 'white', my: 5, px: 5, py: 2 }}
        onClick={handleClickOpen}
      >
        Add Lab Test
      </Button>

      <LabTestsTable doctors={doctorsList} mockTests={mockTests} testNames={testNames} />

      <AddTestDialog 
        open={openDialog} 
        handleClose={handleClose} 
        doctors={doctorsList} 
        mockTests={mockTests}
        testNames={testNames}
      />
    </div>
  );
};

export default LabTests;
