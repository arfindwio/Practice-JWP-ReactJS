import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";

// Redux Actions
import { getAllOrdersAction } from "../../redux/action/orders/OrdersAction";
import { getAllServicesAction } from "../../redux/action/services/ServicesAction";

// Icons
import { MdMiscellaneousServices } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  const orderData = useSelector((state) => state.orders.orders);
  const serviceData = useSelector((state) => state.services.services);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllOrdersAction());
      await dispatch(getAllServicesAction());
    };

    fetchData();
  }, [dispatch]);
  return (
    <div className="flex w-full">
      <div className="flex h-screen w-[22%] flex-col bg-[#6295A2] text-white">
        <AdminSidebar />
      </div>
      <div className="flex w-[78%] flex-col gap-8 bg-slate-100">
        <AdminNavbar />
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex w-fit items-center gap-3 rounded-lg bg-[#B3E2A7] px-6 py-4 text-lg text-white">
              <BsFillBoxSeamFill size={60} className="text-slate-950" />
              <div className="flex flex-col text-2xl">
                <p>{orderData.length}</p>
                <p>Orders</p>
              </div>
            </div>
            <div className="flex w-fit items-center gap-3 rounded-lg bg-[#B3E2A7] px-6 py-4 text-lg text-white">
              <MdMiscellaneousServices size={60} className="text-slate-950" />
              <div className="flex flex-col text-2xl">
                <p>{serviceData.length}</p>
                <p>Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
