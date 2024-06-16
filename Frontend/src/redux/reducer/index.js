import { combineReducers } from "@reduxjs/toolkit";
import UsersSlice from "./users/UsersSlice";
import UserProfilesSlice from "./userProfiles/UserProfilesSlice";
import ServicesSlice from "./services/ServicesSlice";
import OrderSlice from "./order/OrderSlice";

export default combineReducers({
  // User
  users: UsersSlice,

  // User Profiles
  userProfiles: UserProfilesSlice,

  // Services
  services: ServicesSlice,

  // Orders
  orders: OrderSlice,
});
