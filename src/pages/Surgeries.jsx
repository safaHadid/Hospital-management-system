import React, { useState } from 'react';
import { Button } from '@mui/material';
import SurgeriesTable from '../components/Surgeries/SurgeriesTable';
import AddSurgeryDialog from '../components/Surgeries/AddSurgeryDialog';


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

      <SurgeriesTable />

      <AddSurgeryDialog
        open={openDialog} 
        handleClose={handleClose} 
      />
    </div>
  );
};

export default Surgeries;
