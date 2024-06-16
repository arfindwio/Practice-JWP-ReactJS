import {
  reduxGetAllOrders,
  reduxPostCreateOrder,
  reduxPutEditOrderById,
  reduxGetOrderHistory,
} from "../../../services/orders/Order";
import {
  setOrders,
  setOrdersHistory,
  resetOrderHistory,
  startLoading,
  endLoading,
} from "../../reducer/order/OrderSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllOrdersAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllOrders();
    dispatch(setOrders(result.data.data.orders));

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateOrderAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await reduxPostCreateOrder(input);

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditOrderByIdAction = (input, orderId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutEditOrderById(input, orderId);

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getOrderHistoryAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetOrderHistory();
    dispatch(setOrdersHistory(result.data.data.orders));

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
