// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPostRegisterUser = async (input) => {
  return await http.post(`${API_ENDPOINT.USERS}/register`, input);
};

export const reduxPostLoginUser = async (input) => {
  return await http.post(`${API_ENDPOINT.USERS}/login`, input);
};

export const reduxGetUserByAuth = async () => {
  return await http.get(`${API_ENDPOINT.USERS}/authenticate`);
};

export const reduxGetAllUsers = async () => {
  return await http.get(`${API_ENDPOINT.USERS}`);
};
