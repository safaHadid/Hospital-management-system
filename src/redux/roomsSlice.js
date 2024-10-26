import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [
    {
      id: 1,
      room_number: 101,
      room_type: "ICU",
      department_name: "Cardiology",
      status: "Available",
    },
    {
      id: 2,
      room_number: 102,
      room_type: "Shared",
      department_name: "Neurology",
      status: "Occupied",
    },
    {
      id: 3,
      room_number: 103,
      room_type: "ICU",
      department_name: "Pediatrics",
      status: "Available",
    },
    {
      id: 4,
      room_number: 104,
      room_type: "Shared",
      department_name: "Oncology",
      status: "Under Maintenance",
    },
    {
      id: 5,
      room_number: 105,
      room_type: "Private",
      department_name: "Orthopedics",
      status: "Occupied",
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

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
      state.loading = false;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    editRoom: (state, action) => {
      const index = state.rooms.findIndex(
        (room) => room.id === action.payload.id
      );
      if (index >= 0) {
        state.rooms[index] = action.payload;
      }
    },
    deleteRoom: (state, action) => {
      state.rooms = state.rooms.filter((dep) => dep.id !== action.payload);
    },
  },
});

export const { setRooms, addRoom, editRoom, deleteRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
