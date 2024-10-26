import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Elm Street, Springfield",
      specialization: "Cardiologist",
      department_name: "Cardiology",
      gender: "Male",
      salary: "$200,000",
      shift: "Morning",
      date_of_birth: "1985-05-15",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Oak Avenue, Springfield",
      specialization: "Neurologist",
      department_name: "Neurology",
      gender: "Female",
      salary: "$180,000",
      shift: "Night",
      date_of_birth: "1990-03-22",
    },
  ],
  departments: [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Oncology" },
    { id: 4, name: "Pediatrics" },
    { id: 5, name: "Orthopedics" },
    { id: 6, name: "Dermatology" },
    { id: 7, name: "Radiology" },
    { id: 8, name: "Gastroenterology" },
    { id: 9, name: "Emergency Medicine" },
    { id: 10, name: "Endocrinology" },
  ],
  loading: true,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
    },
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
    editDoctor: (state, action) => {
      const index = state.doctors.findIndex(
        (doctor) => doctor.id === action.payload.id
      );
      if (index >= 0) {
        state.doctors[index] = action.payload;
      }
    },
    deleteDoctor: (state, action) => {
      state.doctors = state.doctors.filter((dep) => dep.id !== action.payload);
    },
  },
});

export const { setDoctors, addDoctor, editDoctor, deleteDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;
