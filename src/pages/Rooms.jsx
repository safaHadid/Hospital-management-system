import React, { useState } from 'react';
import { Button } from '@mui/material';
import RoomsTable from '../components/Rooms/RoomsTable';
import AddRoomDialog from '../components/Rooms/AddRoomDialog';

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
        sx={{ backgroundColor: 'primary.main', color: 'white', my: 2, px: 5, py: 2 }}
        onClick={handleClickOpen}
      >
        Add Room
      </Button>

      <RoomsTable />

      <AddRoomDialog
        open={openDialog} 
        handleClose={handleClose} 
      />
    </div>
  );
};

export default Rooms;
