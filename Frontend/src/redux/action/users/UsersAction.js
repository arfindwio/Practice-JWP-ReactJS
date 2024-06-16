import {
  reduxPostRegisterUser,
  reduxPostLoginUser,
  reduxGetAllUsers,
  reduxGetUserByAuth,
} from "../../../services/users/Users";
import {
  setUsers,
  setUserAuthenticate,
  resetUserAuth,
  startLoading,
  endLoading,
} from "../../reducer/users/UsersSlice";
import { resetOrderHistory } from "../../reducer/order/OrderSlice";
import { CookiesKeys, CookieStorage } from "../../../utils/cookie";
import { handleRequestError } from "../../../utils/errorHandler";

export const postRegisterUserAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostRegisterUser(input);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postLoginUserAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostLoginUser(input);
    CookieStorage.set(CookiesKeys.AuthToken, result.data.data.token);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const logoutUserAction = () => (dispatch) => {
  try {
    dispatch(resetUserAuth());
    dispatch(resetOrderHistory());

    CookieStorage.remove(CookiesKeys.AuthToken);
  } catch (err) {
    handleRequestError(err);
  }
};

export const getUserAuthenticateAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetUserByAuth();
    dispatch(setUserAuthenticate(result.data.data.user));
    return true;
  } catch (err) {
    if (err.response) console.error("unexpected Error", err);
  } finally {
    dispatch(endLoading());
  }
};

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllUsers();
    dispatch(setUsers(result.data.data.users));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
