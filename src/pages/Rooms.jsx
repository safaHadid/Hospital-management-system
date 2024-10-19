import React, { useState } from 'react';
import { Button } from '@mui/material';
import RoomsTable from '../components/Rooms/RoomsTable';
import AddRoomDialog from '../components/Rooms/AddRoomDialog';

const departments = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Neurology' },
  { id: 3, name: 'Oncology' },
  { id: 4, name: 'Pediatrics' },
  { id: 5, name: 'Orthopedics' },
  { id: 6, name: 'Dermatology' },
  { id: 7, name: 'Radiology' },
  { id: 8, name: 'Gastroenterology' },
  { id: 9, name: 'Emergency Medicine' },
  { id: 10, name: 'Endocrinology' }
];

const Rooms = () => {
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
        Add Room
      </Button>

      <RoomsTable departments={departments} />

      <AddRoomDialog
        open={openDialog} 
        handleClose={handleClose} 
        departments={departments} 
      />
    </div>
  );
};

export default Rooms;
