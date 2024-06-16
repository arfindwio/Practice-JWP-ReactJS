import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  ordersHistory: [],
  loading: false,
};

const OrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrdersHistory: (state, action) => {
      state.ordersHistory = action.payload;
    },
    resetOrderHistory: (state) => {
      state.ordersHistory = [];
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  setOrders,
  setOrdersHistory,
  resetOrderHistory,
  startLoading,
  endLoading,
} = OrdersSlice.actions;

export default OrdersSlice.reducer;
