// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllOrders = async () => {
  return await http.get(`${API_ENDPOINT.ORDERS}`);
};

export const reduxPostCreateOrder = async (input) => {
  return await http.post(`${API_ENDPOINT.ORDERS}`, input);
};

export const reduxPutEditOrderById = async (input, orderId) => {
  return await http.put(`${API_ENDPOINT.ORDERS}/${orderId}`, input);
};

export const reduxGetOrderHistory = async () => {
  return await http.get(`${API_ENDPOINT.ORDERS}/history`);
};
