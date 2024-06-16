import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  loading: false,
};

const ServicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setServices, startLoading, endLoading } = ServicesSlice.actions;

export default ServicesSlice.reducer;
