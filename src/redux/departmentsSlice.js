import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [
    {
      id: 1,
      name: "Cardiology",
      number_of_rooms: 10,
      head_doctor: "Dr. Smith",
      doctors: ["Dr. Smith", "Dr. A", "Dr. B"],
    },
    {
      id: 2,
      name: "Neurology",
      number_of_rooms: 8,
      head_doctor: "Dr. Johnson",
      doctors: ["Dr. Johnson", "Dr. C", "Dr. D"],
    },
    {
      id: 3,
      name: "Pediatrics",
      number_of_rooms: 12,
      head_doctor: "Dr. Williams",
      doctors: ["Dr. Williams", "Dr. E", "Dr. F"],
    },
  ],
  doctors:[
    "Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Taylor"
  ],
  loading: true,
};

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
      state.loading = false;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    editDepartment: (state, action) => {
      const index = state.departments.findIndex(
        (dep) => dep.id === action.payload.id
      );
      if (index >= 0) {
        state.departments[index] = action.payload;
      }
    },
    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(
        (dep) => dep.id !== action.payload
      );
    },
  },
});

export const {
  setDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
} = departmentsSlice.actions;
export default departmentsSlice.reducer;
