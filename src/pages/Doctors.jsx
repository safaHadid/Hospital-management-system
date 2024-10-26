import React, { useState } from 'react';
import { Button } from '@mui/material';
import DepartmentsTable from '../components/Doctors/DoctorsTable';
import AddDoctorDialog from '../components/Doctors/AddDoctorDialog';

const Doctors = () => {
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
        Add Doctor
      </Button>

      <DepartmentsTable />

      <AddDoctorDialog 
        open={openDialog} 
        handleClose={handleClose} 
      />
    </div>
  );
};

export default Doctors;
