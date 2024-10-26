import { configureStore } from '@reduxjs/toolkit';
import departmentsReducer from './departmentsSlice';
import roomsReducer from './roomsSlice';
import doctorsReducer from './doctorsSlice';

export const store = configureStore({
  reducer: {
      department: departmentsReducer,
      room: roomsReducer,
      doctor: doctorsReducer,
  },
});
export default store;
