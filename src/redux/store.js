import { configureStore } from '@reduxjs/toolkit';
import departmentsReducer from './departmentsSlice';
import roomsReducer from './roomsSlice'

export const store = configureStore({
  reducer: {
      department: departmentsReducer,
      room: roomsReducer,
  },
});
export default store;
