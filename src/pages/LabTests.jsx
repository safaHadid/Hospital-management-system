import React, { useState } from 'react';
import { Button } from '@mui/material';
import LabTestsTable from '../components/LabTests/LabTestsTable';
import AddTestDialog from '../components/LabTests/AddTestDialog';

const LabTests = () => {
  const [openDialog, setOpenDialog] = useState(false);

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

      <LabTestsTable testNames={testNames} />

      <AddTestDialog 
        open={openDialog} 
        handleClose={handleClose} 
        testNames={testNames}
      />
    </div>
  );
};

export default LabTests;
