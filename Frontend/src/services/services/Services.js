// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllServices = async () => {
  return await http.get(`${API_ENDPOINT.SERVICES}`);
};

export const reduxPostCreateService = async (input) => {
  return await http.post(`${API_ENDPOINT.SERVICES}`, input);
};

export const reduxPutEditServiceById = async (input, serviceId) => {
  return await http.put(`${API_ENDPOINT.SERVICES}/${serviceId}`, input);
};

export const reduxDeleteServiceById = async (serviceId) => {
  return await http.delete(`${API_ENDPOINT.SERVICES}/${serviceId}`);
};
