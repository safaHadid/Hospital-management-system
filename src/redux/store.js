import { configureStore } from '@reduxjs/toolkit';
import departmentsReducer from './departmentsSlice';

export const store = configureStore({
  reducer: {
      department: departmentsReducer,
  },
});
export default store;
