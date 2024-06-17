import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

export const AdminSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      <h1 className="pt-8 text-center text-3xl font-bold">JeWePe</h1>
      <div className="flex flex-col pt-4">
        <Link
          to={"/admin/dashboard"}
          className={`${
            location.pathname === "/admin/dashboard"
              ? "bg-white text-slate-950"
              : "text-white hover:bg-white hover:bg-opacity-70 hover:text-slate-950"
          } px-6 py-3 text-xl font-bold`}
        >
          Dashboard
        </Link>
        <Link
          to={"/admin/manage-services"}
          className={`${
            location.pathname === "/admin/manage-services"
              ? "bg-white text-slate-950"
              : "text-white hover:bg-white hover:bg-opacity-70 hover:text-slate-950"
          } px-6 py-3 text-xl font-bold`}
        >
          Manage Services
        </Link>
        <Link
          to={"/admin/manage-orders"}
          className={`${
            location.pathname === "/admin/manage-orders"
              ? "bg-white text-slate-950"
              : "text-white hover:bg-white hover:bg-opacity-70 hover:text-slate-950"
          } px-6 py-3 text-xl font-bold`}
        >
          Manage Orders
        </Link>
        <Link
          to={"/admin/order-reports"}
          className={`${
            location.pathname === "/admin/order-reports"
              ? "bg-white text-slate-950"
              : "text-white hover:bg-white hover:bg-opacity-70 hover:text-slate-950"
          } px-6 py-3 text-xl font-bold`}
        >
          Order Reports
        </Link>
        <button
          type="button"
          className="px-6 py-3 text-start text-xl font-bold text-white hover:bg-white hover:bg-opacity-50 hover:text-slate-950"
          onClick={() => dispatch(logoutUserAction())}
        >
          Logout
        </button>
      </div>
    </>
  );
};
