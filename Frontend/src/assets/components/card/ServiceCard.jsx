import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Redux Action
import { postCreateOrderAction } from "../../../redux/action/orders/OrdersAction";

// Helper
import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const ServiceCard = ({ service }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [inputOrder, setInputOrder] = useState({
    weddingDate: "",
    serviceId: null,
  });

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    setInputOrder({
      serviceId: service.id,
    });
  }, [service.id]);

  const handleInputChange = (e) => {
    setInputOrder((prevInputOrder) => ({
      ...prevInputOrder,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrder = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      if (!token) {
        showErrorToast("Please log in first");
        navigate("/login");
      }

      const loadingToastId = showLoadingToast("Loading...");

      const order = await dispatch(postCreateOrderAction(inputOrder));

      toast.dismiss(loadingToastId);

      if (!order) showErrorToast("Order Failed");

      if (order) {
        showSuccessToast("Order Successful");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-2xl border bg-slate-200 p-4 shadow-sm">
      <img
        src={service.serviceImage}
        alt=""
        className="h-[13rem] w-full rounded-md  object-cover"
      />
      <div className="border- flex h-fit flex-col flex-wrap gap-2 border-slate-100 p-2">
        <h4 className="text-lg font-medium">{service.packageName}</h4>
        <h3 className="text-xl font-bold text-[#6295A2]">
          IDR {service.price?.toLocaleString()}
        </h3>
        <p className={`${!show && "truncate"} text-wrap text-justify text-sm`}>
          {service.description}
        </p>
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={() => setShow(!show)}
        >
          {!show ? "Show More" : "Show Less"}
        </button>
      </div>
      <form
        className="mt-auto flex w-full flex-col flex-wrap"
        onKeyDown={handleOrder}
      >
        <label for="weddingDate">Wedding Date</label>
        <input
          type="date"
          name="weddingDate"
          className="w-full rounded-lg bg-gray-100 px-4 py-2"
          value={inputOrder.weddingDate}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-[#80B9AD] py-2 text-white"
          onClick={handleOrder}
        >
          ORDER NOW
        </button>
      </form>
    </div>
  );
};
