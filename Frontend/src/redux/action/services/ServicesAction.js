import {
  reduxGetAllServices,
  reduxPostCreateService,
  reduxPutEditServiceById,
  reduxDeleteServiceById,
} from "../../../services/services/Services";
import {
  setServices,
  startLoading,
  endLoading,
} from "../../reducer/services/ServicesSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllServicesAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllServices();
    dispatch(setServices(result.data.data.services));

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateServiceAction = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { packageName, price, description, isPublish, image } = formData;

    const formDataObject = new FormData();
    formDataObject.append("packageName", packageName);
    formDataObject.append("price", price);
    formDataObject.append("description", description);
    formDataObject.append("isPublish", isPublish);
    formDataObject.append("image", image || "");

    await reduxPostCreateService(formDataObject);

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditServiceByIdAction =
  (formData, serviceId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { packageName, price, description, isPublish, image } = formData;

      const formDataObject = new FormData();
      formDataObject.append("packageName", packageName);
      formDataObject.append("price", price);
      formDataObject.append("description", description);
      formDataObject.append("isPublish", isPublish);
      formDataObject.append("image", image || "");

      await reduxPutEditServiceById(formDataObject, serviceId);

      return true;
    } catch (err) {
      handleRequestError(err);
    } finally {
      dispatch(endLoading());
    }
  };

export const deleteServiceByIdAction = (serviceId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteServiceById(serviceId);

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
