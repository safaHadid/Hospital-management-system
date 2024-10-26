import React, { useState } from 'react';
import { Button } from '@mui/material';
import DepartmentsTable from '../components/Department/DepartmentsTable';
import AddDepartmentDialog from '../components/Department/AddDepartmentDialog';

const Department = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const doctorsList = [
    "Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Taylor"
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
        Add Department
      </Button>

      <DepartmentsTable />

      <AddDepartmentDialog
        open={openDialog} 
        handleClose={handleClose} 
        doctors={doctorsList} 
      />
    </div>
  );
};

export default Department;
